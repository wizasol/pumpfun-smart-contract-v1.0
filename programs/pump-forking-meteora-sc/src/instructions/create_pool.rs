use crate::states::*;
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

pub fn create_pool(ctx: Context<CreateLiquidityPool>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;

    pool.set_inner(LiquidityPool::new(
        ctx.accounts.payer.key(),
        ctx.accounts.token_mint.key(),
        *ctx.bumps.get("pool").unwrap(),
    ));
    Ok(())
}

#[derive(Accounts)]
pub struct CreateLiquidityPool<'info> {
    #[account(
        init,
        space = LiquidityPool::ACCOUNT_SIZE,
        payer = payer,
        seeds = [LiquidityPool::POOL_SEED_PREFIX.as_bytes(), token_mint.key().as_ref()],
        bump
    )]
    pub pool: Box<Account<'info, LiquidityPool>>,

    #[account(mut)]
    pub token_mint: Box<Account<'info, Mint>>,

    #[account(
        init,
        payer = payer,
        associated_token::mint = token_mint,
        associated_token::authority = pool
    )]
    pub pool_token_mint: Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
