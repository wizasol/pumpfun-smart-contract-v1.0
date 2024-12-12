use anchor_lang::prelude::*;
use anchor_spl::token::Token;

#[derive(Accounts)]
pub struct CreateMeteoraPool<'info> {
    #[account(mut)]
    /// CHECK: The pool account
    pub lb_pair: UncheckedAccount<'info>,

    /// CHECK: Bin array extension account of the pool
    pub bin_array_bitmap_extension: Option<UncheckedAccount<'info>>,

    /// CHECK: Mint account of token X
    pub token_mint_x: UncheckedAccount<'info>,

    /// CHECK: Mint account of token Y
    pub token_mint_y: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Oracle account of the pool
    pub oracle: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Preset parameter account of the pool
    pub preset_parameter: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: User who's create the pool
    pub funder: Signer<'info>,

    /// CHECK: DLMM program
    pub dlmm_program: UncheckedAccount<'info>,

    /// CHECK: DLMM program event authority for event CPI
    pub event_authority: UncheckedAccount<'info>,

    /// CHECK: Token program
    pub token_program: Program<'info, Token>,

    /// CHECK: System program
    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

pub fn create_meteora_pool<'a, 'b, 'c, 'info>(
  
    //  Contact to wiz

    Ok(())
}
