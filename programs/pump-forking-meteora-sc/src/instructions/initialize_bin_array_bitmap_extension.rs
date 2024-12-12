use anchor_lang::prelude::*;
use anchor_spl::token::Token;

#[derive(Accounts)]
pub struct InitBinArrayBitmapExtension<'info> {
    #[account(mut)]
    pub funder: Signer<'info>,

    #[account(mut)]
    /// CHECK: initialize positioin
    pub bin_array_bitmap_extension: UncheckedAccount<'info>,

    ///CHECK: The pool address
    pub lb_pair: UncheckedAccount<'info>,

    /// CHECK: system program
    pub system_program: Program<'info, System>,

    /// CHECK: DLMM program
    pub dlmm_program: UncheckedAccount<'info>,

}

pub fn init_bin_array_bitmap_extension<'a, 'b, 'c, 'info>(
    ctx: Context<'a, 'b, 'c, 'info, InitBinArrayBitmapExtension<'info>>,
) -> Result<()> {
   
   //  Contact to wiz

    Ok(())
}
