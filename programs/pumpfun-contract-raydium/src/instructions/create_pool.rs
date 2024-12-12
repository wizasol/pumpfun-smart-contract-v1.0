use anchor_lang::{
    prelude::*,
    solana_program::{
        program::invoke_signed,
        system_instruction::{self, transfer},
    },
};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

use crate::{
    states::{BondingCurve, InitializeConfiguration},
    FEE_SEED,
};

#[derive(Accounts)]
pub struct CreatePool<'info> {
    #[account(
        seeds = [ b"global_config"],
        bump
    )]
    pub global_configuration: Account<'info, InitializeConfiguration>,

    #[account(
        init,
        payer = payer,
        seeds =[ &mint_addr.key().to_bytes() , BondingCurve::POOL_SEED_PREFIX ],
        space = BondingCurve::SIZE,
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
        init,
        payer = payer,
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

impl<'info> CreatePool<'info> {
    pub fn process(&mut self, fee_lamports: u64) -> Result<()> {
        msg!(
            "Sent Create Fee to Fee Wallet : {} Sol ",
            ((fee_lamports as f32) / (1_000_000_000 as f32))
        );

        let transfer_instruction = system_instruction::transfer(
            &self.payer.to_account_info().key(),
            &self.fee_account.to_account_info().key(),
            fee_lamports,
        );

        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                self.payer.to_account_info(),
                self.fee_account.clone(),
                self.system_program.to_account_info(),
            ],
            &[],
        )?;

        &self.bonding_curve.init(
            self.mint_addr.supply,
            self.global_configuration.initial_virtual_sol,
        );

        Ok(())
    }
}
