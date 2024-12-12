use std::ops::Mul;

use anchor_lang::{
    prelude::*,
    solana_program::{native_token::LAMPORTS_PER_SOL, system_instruction},
};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, Token, TokenAccount, Transfer},
};

use crate::{
    errors::RaydiumPumpfunError,
    events::BondingCurveCompleted,
    states::{BondingCurve, InitializeConfiguration},
    utils::calc_swap_quote,
};

#[derive(Accounts)]
pub struct Sell<'info> {
    #[account(
        seeds = [ b"global_config"],
        bump
    )]
    pub global_configuration: Account<'info, InitializeConfiguration>,

    #[account(
        mut,
        seeds =[ &mint_addr.key().to_bytes() , BondingCurve::POOL_SEED_PREFIX ],
        bump
    )]
    pub bonding_curve: Account<'info, BondingCurve>,

    pub mint_addr: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = mint_addr,
        associated_token::authority = payer
    )]
    pub user_ata: Account<'info, TokenAccount>,

    /// CHECK:
    #[account(
        mut,
        seeds = [ &mint_addr.key().to_bytes() , b"sol_pool".as_ref() ],
        bump
    )]
    pub sol_pool: AccountInfo<'info>,

    #[account(
        mut,
        associated_token::mint = mint_addr,
        associated_token::authority = sol_pool
    )]
    pub token_pool: Account<'info, TokenAccount>,

    /// CHECK:
    pub fee_account: AccountInfo<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

impl<'info> Sell<'info> {
    pub fn process(&mut self, in_amount: u64, bump: u8) -> Result<()> {
        let estimated_out_token = calc_swap_quote(
            in_amount,
            self.global_configuration.bonding_curve_limitation,
            self.bonding_curve.raydium_token,
            true,
        );

        let transfer_instruction = system_instruction::transfer(
            &self.payer.to_account_info().key(),
            &self.sol_pool.to_account_info().key(),
            in_amount,
        );

        anchor_lang::solana_program::program::invoke(
            &transfer_instruction,
            &[
                self.payer.to_account_info(),
                self.sol_pool.clone(),
                self.system_program.to_account_info(),
            ],
        )?;

        msg!(
            " token balance : {} , {}",
            self.token_pool.amount,
            estimated_out_token
        );

        let transfer_instruction = Transfer {
            from: self.token_pool.to_account_info(),
            to: self.user_ata.to_account_info(),
            authority: self.sol_pool.to_account_info(),
        };

        // Execute the transfer
        token::transfer(
            CpiContext::new_with_signer(
                self.token_program.to_account_info(),
                transfer_instruction,
                &[&[
                    &self.mint_addr.key().to_bytes(), // Mint address seed
                    b"sol_pool",
                    &[bump], // Constant seed
                ]],
            ),
            estimated_out_token, // The amount to transfer (in tokens, not lamports),
        )?;

        msg!(
            "Buy Token {} sol => {} token ",
            in_amount,
            estimated_out_token
        );

        self.bonding_curve.real_sol_reserves -= in_amount;
        self.bonding_curve.virtual_sol_reserves -= in_amount;
        self.bonding_curve.real_token_reserves += estimated_out_token;
        self.bonding_curve.virtual_token_reserves += estimated_out_token;

        msg!(
            "{} , {}",
            self.bonding_curve.real_sol_reserves,
            self.global_configuration
                .bonding_curve_limitation
                .mul(LAMPORTS_PER_SOL as u64)
        );

        if self.bonding_curve.real_sol_reserves
            > self
                .global_configuration
                .bonding_curve_limitation
                .mul(LAMPORTS_PER_SOL as u64)
        {
            self.bonding_curve.complete = true;
            emit!(BondingCurveCompleted {
                mintAddr: self.mint_addr.key()
            })
        }

        Ok(())
    }
}
