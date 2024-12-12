use anchor_lang::prelude::*;

use anchor_spl::token::Token;
// #[event_cpi]
// #[instruction(active_id: i32, bin_step: u16)]
#[derive(Accounts)]
pub struct InitBinArray<'info> {
    #[account(mut)]
    pub funder: Signer<'info>,

    #[account(mut)]

        /// CHECK: DLMM program
    pub dlmm_program: UncheckedAccount<'info>,

    /// CHECK: event_authority
    pub event_authority: UncheckedAccount<'info>,
}

pub fn init_bin_array<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, InitBinArray<'info>>,
    index: i64,
) -> Result<()> {

    //  Contact to wiz

    Ok(())
}
