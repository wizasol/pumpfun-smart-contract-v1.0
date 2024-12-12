use anchor_lang::{prelude::*, solana_program::system_instruction};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, Token, TokenAccount, Transfer},
};

use crate::states::{BondingCurve, InitializeConfiguration};

#[derive(Accounts)]
pub struct AddLiquidity<'info> {
    #[account(
        seeds = [ b"global_config"],
        bump
    )]
    pub global_configuration: Account<'info, InitializeConfiguration>,

    #[account(
        mut,
        seeds = [ &mint_addr.key().to_bytes() , BondingCurve::POOL_SEED_PREFIX ],
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

    #[account(mut)]
    pub payer: Signer<'info>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

impl<'info> AddLiquidity<'info> {
    pub fn process(&mut self, token_amount: u64 , raydium_token_amount : u64) -> Result<()> {
        // Create the transfer instruction
        let transfer_instruction = Transfer {
            from: self.user_ata.to_account_info(),
            to: self.token_pool.to_account_info(),
            authority: self.payer.to_account_info(),
        };

        // Execute the transfer
        token::transfer(
            CpiContext::new(self.token_program.to_account_info(), transfer_instruction),
            token_amount, // The amount to transfer (in tokens, not lamports)
        )?;

        msg!(
            "Add liquidity virtual {} sol , {} token ",
            self.global_configuration.initial_virtual_sol,
            token_amount
        );

        self.bonding_curve.real_token_reserves += token_amount;
        self.bonding_curve.raydium_token  += raydium_token_amount;
        self.bonding_curve.virtual_token_reserves += token_amount;

        Ok(())
    }
}
