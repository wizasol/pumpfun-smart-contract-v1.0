use anchor_lang::prelude::*;
pub mod consts;
pub mod errors;
pub mod instructions;
pub mod states;
pub mod utils;
use crate::instructions::*;

declare_id!("2kKiLBYRzc7emXPHTmVzU9aPMAJ8oZ1m2wUWRno7Lfgq");

#[program]

pub mod pump_forking_meteora_sc {

    use super::*;

    ////////////////////        Initialize          /////////////////////
    pub fn initialize(ctx: Context<Initialize>, fee: f64) -> Result<()> {
        instructions::initialize(ctx, fee)
    }
    ////////////////////        Create Pool         /////////////////////
    pub fn create_pool(ctx: Context<CreateLiquidityPool>) -> Result<()> {
        instructions::create_pool(ctx)
    }
    ///////////////////         Add Liquidity       /////////////////////
    pub fn add_liquidity(ctx: Context<AddLiquidity>) -> Result<()> {
        instructions::add_liquidity(ctx)
    }
    ///////////////////         Remove Liquidity        ////////////////////
    pub fn remove_liquidity(ctx: Context<RemoveLiquidity>, bump: u8) -> Result<()> {
        instructions::remove_liquidity(ctx, bump)
    }
    ///////////////////         Buy token       //////////////////////
    pub fn buy(ctx: Context<Buy>, amount: u64, current_sol_price: f64) -> Result<()> {
        instructions::buy(ctx, amount, current_sol_price)
    }
    //////////////////      Sell token      ////////////////////
    pub fn sell(ctx: Context<Sell>, amount: u64, bump: u8) -> Result<()> {
        instructions::sell(ctx, amount, bump)
    }
    //////////////////          Create DLMM Pool        ////////////////////
    pub fn create_meteora_pool<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, CreateMeteoraPool<'info>>,
        active_id: i32,
        bin_step: u16,
    ) -> Result<()> {
        instructions::create_meteora_pool(ctx, active_id, bin_step)
    }
    /////////////////       Initialize Position     ////////////////////
    pub fn initialize_position<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, InitializePosition<'info>>,
        lower_bin_id: i32,
        width: i32,
    ) -> Result<()> {
        instructions::initialize_position(ctx, lower_bin_id, width)
    }
    /////////////////       Add Liquidity on position       /////////////////
    pub fn add_meteora_liquidity<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, AddMeteoraLiquidity<'info>>,
        amountX: u64,
        amountY: u64,
        bin_id: i32,
        disturbX: u16,
        disturbY: u16,
    ) -> Result<()> {
        instructions::add_meteora_liquidity(ctx, amountX, amountY, bin_id, disturbX, disturbY)
    }
    ///////////////           Initialize binArrayBitmapExtension        //////////////
    pub fn init_bin_array_bitmap_extension<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, InitBinArrayBitmapExtension<'info>>,
    ) -> Result<()> {
        instructions::init_bin_array_bitmap_extension(ctx)
    }
    //////////////            Initialize binArray              ////////////
    pub fn init_bin_array<'a, 'b, 'c, 'info>(
        ctx: Context<'a, 'b, 'c, 'info, InitBinArray<'info>>,
        index: i64,
    ) -> Result<()> {
        instructions::init_bin_array(ctx, index)
    }
}
