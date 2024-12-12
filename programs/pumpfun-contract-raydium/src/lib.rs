use anchor_lang::prelude::*;

pub mod consts;
pub mod errors;
pub mod events;
pub mod instructions;
pub mod states;
pub mod utils;

use crate::consts::*;
use crate::instructions::*;

declare_id!("FmWGXibpZkvukerBXaEFLiFNyTMg8GwbVMm4bFPweHV4");

#[program]
pub mod pumpfun_contract_raydium {

    use amm_anchor::Initialize2;

    use super::*;

    pub fn initialize(ctx: Context<Initialize>, param: InitializeConfigurationParam) -> Result<()> {
        ctx.accounts.process(param);
        Ok(())
    }

    pub fn create_pool(ctx: Context<CreatePool>, fee_lamports: u64) -> Result<()> {
        ctx.accounts.process(fee_lamports);
        Ok(())
    }

    pub fn add_liquidity(
        ctx: Context<AddLiquidity>,
        token_amount: u64,
        raydium_token_amount: u64,
    ) -> Result<()> {
        ctx.accounts.process(token_amount, raydium_token_amount);
        Ok(())
    }

    pub fn buy(ctx: Context<Buy>, in_amount: u64) -> Result<()> {
        ctx.accounts.process(in_amount, ctx.bumps.sol_pool);
        Ok(())
    }

    pub fn sell(ctx: Context<Sell>, in_amount: u64) -> Result<()> {
        ctx.accounts.process(in_amount, ctx.bumps.sol_pool);
        Ok(())
    }

    /// Initiazlize a swap pool
    pub fn remove_liquidity(ctx: Context<RemoveLiquidity>) -> Result<()> {
        ctx.accounts.process(ctx.bumps.sol_pool);
        Ok(())
    }

    /// Initiazlize a swap pool
    pub fn raydium_integrate(
        ctx: Context<RaydiumIntegrate>,
        nonce: u8,
        input_pc_amount: u64,
        input_coin_amount: u64,
    ) -> Result<()> {
        let opentime = Clock::get()?.unix_timestamp as u64;
        instructions::initialize(ctx, nonce, opentime , input_pc_amount , input_coin_amount)
    }
}
