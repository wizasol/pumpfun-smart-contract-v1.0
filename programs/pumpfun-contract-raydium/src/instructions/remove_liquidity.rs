use amm_anchor::Initialize2;
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Token, Transfer};
use solana_program::system_instruction;

use crate::states::{BondingCurve, InitializeConfiguration};

#[derive(Accounts, Clone)]
pub struct RemoveLiquidity<'info> {
    #[account(
        seeds = [b"global_config"],
        bump
    )]
    pub global_configuration: Account<'info, InitializeConfiguration>,

    #[account(
        mut,
        seeds = [&amm_coin_mint.key().to_bytes(), BondingCurve::POOL_SEED_PREFIX],
        bump
    )]
    pub bonding_curve: Account<'info, BondingCurve>,

    /// CHECK: Safe. Coin mint account
    #[account(
        owner = token_program.key()
    )]
    pub amm_coin_mint: UncheckedAccount<'info>,

    /// CHECK: Safe. Amm target orders Account. Must be non-zero, owned by $authority.
    #[account(
        mut,
        seeds = [&amm_coin_mint.key().to_bytes(), b"sol_pool".as_ref()],
        bump
    )]
    pub sol_pool: UncheckedAccount<'info>,

    /// CHECK: Safe. Amm Config.
    #[account(mut)]
    pub token_pool: UncheckedAccount<'info>,

    /// CHECK: Safe. The user wallet creating the pool.
    #[account(mut)]
    pub user_wallet: Signer<'info>,

    /// CHECK: Safe. The user coin token.
    #[account(
        mut,
        owner = token_program.key(),
    )]
    pub user_token_coin: UncheckedAccount<'info>,

    /// CHECK: Safe. The user PC token.
    #[account(
        mut,
        owner = token_program.key(),
    )]
    pub user_token_pc: UncheckedAccount<'info>,

    /// CHECK: Safe. The user LP token.
    #[account(mut)]
    pub user_token_lp: UncheckedAccount<'info>,

    /// CHECK: Safe. The SPL token program.
    pub token_program: Program<'info, Token>,

    /// CHECK: Safe. The associated token program.
    pub associated_token_program: Program<'info, AssociatedToken>,

    /// CHECK: Safe. System program.
    pub system_program: Program<'info, System>,

    /// CHECK: Safe. Rent program.
    pub sysvar_rent: Sysvar<'info, Rent>,
}

impl<'info> RemoveLiquidity<'info> {
    pub fn process(&mut self , sol_bump : u8) -> Result<()> {
        msg!("sol_pool owner: {:?}", self.sol_pool.owner);
        msg!("user_wallet owner: {:?}", self.user_wallet.owner);
        // Log account balances for debugging

        msg!(
            "Sol amount for DEX after BC: {}, Raydium token: {}",
            self.global_configuration.sol_amount_for_dex_after_bc,
            self.bonding_curve.raydium_token
        );

        // Perform SOL transfer from sol_pool to user_wallet
        let transfer_instruction = system_instruction::transfer(
            &self.sol_pool.to_account_info().key(),
            &self.user_token_pc.to_account_info().key(),
            self.global_configuration.sol_amount_for_dex_after_bc,
        );

        // Invoke the transfer
        solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                self.sol_pool.to_account_info(),
                self.user_token_pc.to_account_info(),
                self.system_program.to_account_info(),
            ],
            &[&[
                &self.amm_coin_mint.key().to_bytes(),
                b"sol_pool",
                &[sol_bump],
            ]],
        )?;

        // Sync native tokens to ensure proper balance
        let sync_native_ix =
            spl_token::instruction::sync_native(&spl_token::id(), &self.user_token_pc.key)?;
        anchor_lang::solana_program::program::invoke_signed(
            &sync_native_ix,
            &[
                self.user_token_pc.to_account_info(),
                self.token_program.to_account_info(),
            ],
            &[&[
                &self.amm_coin_mint.key().to_bytes(),
                b"sol_pool",
                &[sol_bump],
            ]],
        )?;

        // Token transfer from the token pool to the user wallet
        let transfer_instruction = Transfer {
            from: self.token_pool.to_account_info(),
            to: self.user_token_coin.to_account_info(),
            authority: self.sol_pool.to_account_info(),
        };

        // Execute token transfer
        token::transfer(
            CpiContext::new_with_signer(
                self.token_program.to_account_info(),
                transfer_instruction,
                &[&[
                    &self.amm_coin_mint.key().to_bytes(),
                    b"sol_pool",
                    &[sol_bump],
                ]],
            ),
            self.bonding_curve.raydium_token,
        )?;

        Ok(())
    }
}
