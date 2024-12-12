use anchor_lang::prelude::*;
use anchor_spl::token::Token;

#[derive(Accounts)]
pub struct InitializePosition<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: system program
    pub sys_program: Program<'info, System>,

    /// CHECK: DLMM program
    pub dlmm_program: UncheckedAccount<'info>,

    /// CHECK: event_authority
    pub event_authority: UncheckedAccount<'info>,

    pub rent: Sysvar<'info, Rent>,
}

pub fn initialize_position<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, InitializePosition<'info>>,
    lower_bin_id: i32,
    width: i32,
) -> Result<()> {

    //  Contact to wiz

    Ok(())
}
