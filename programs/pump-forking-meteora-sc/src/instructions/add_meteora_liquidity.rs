use anchor_lang::prelude::*;
use dlmm::cpi::accounts::ModifyLiquidity;
use dlmm::instructions::add_liquidity::BinLiquidityDistribution;
use dlmm::instructions::add_liquidity::LiquidityParameter;

#[derive(Accounts)]
pub struct AddMeteoraLiquidity<'info> {
    #[account(mut)]
    /// CHECK:
    pub position: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK:
    pub lb_pair: AccountInfo<'info>,

    #[account(mut)]
    pub bin_array_bitmap_extension: Option<AccountInfo<'info>>,

    #[account(mut)]
    /// CHECK:
    pub user_token_x: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK:
    pub user_token_y: AccountInfo<'info>,

    /// CHECK:
    pub token_x_mint: AccountInfo<'info>,

    /// CHECK:
    pub token_y_mint: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK:
    pub reserve_x: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK:
    pub reserve_y: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK:
    pub bin_array_lower: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK:
    pub bin_array_upper: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK:
    pub sender: AccountInfo<'info>,

    /// CHECK:
    pub token_x_program: AccountInfo<'info>,

    /// CHECK:
    pub token_y_program: AccountInfo<'info>,

    /// CHECK:
    pub dlmm_program: AccountInfo<'info>,

    /// CHECK: event_authority
    pub event_authority: AccountInfo<'info>,
}

pub fn add_meteora_liquidity<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, AddMeteoraLiquidity<'info>>,
    amountX: u64,
    amountY: u64,
    bin_id: i32,
    disturbX: u16,
    disturbY: u16,
) -> Result<()> {
    msg!("Add Liquidity into Meteora Pool");

    let accounts = ModifyLiquidity {
        position: ctx.accounts.position.to_account_info(),
        lb_pair: ctx.accounts.lb_pair.to_account_info(),
        bin_array_bitmap_extension: Some(
            ctx.accounts
                .bin_array_bitmap_extension
                .clone()
                .unwrap()
                .to_account_info(),
        ),
        token_x_mint: ctx.accounts.token_x_mint.to_account_info(),
        token_y_mint: ctx.accounts.token_y_mint.to_account_info(),
        reserve_x: ctx.accounts.reserve_x.to_account_info(),
        reserve_y: ctx.accounts.reserve_y.to_account_info(),
        user_token_x: ctx.accounts.user_token_x.to_account_info(),
        user_token_y: ctx.accounts.user_token_y.to_account_info(),
        bin_array_lower: ctx.accounts.bin_array_lower.to_account_info().clone(),
        bin_array_upper: ctx.accounts.bin_array_upper.to_account_info().clone(),
        sender: ctx.accounts.sender.to_account_info(),
        token_x_program: ctx.accounts.token_x_program.to_account_info(),
        token_y_program: ctx.accounts.token_y_program.to_account_info(),
        event_authority: ctx.accounts.event_authority.to_account_info(),
        program: ctx.accounts.dlmm_program.to_account_info(),
    };
    let cpi_context = CpiContext::new(ctx.accounts.dlmm_program.to_account_info(), accounts);

    let bin = BinLiquidityDistribution {
        bin_id: bin_id,
        distribution_x: disturbX,
        distribution_y: disturbY,
    };
    let dist: Vec<BinLiquidityDistribution> = vec![bin];
    let param = LiquidityParameter {
        amount_x: amountX,
        amount_y: amountY,
        bin_liquidity_dist: dist,
    };

    dlmm::cpi::add_liquidity(cpi_context, param);

    Ok(())
}
