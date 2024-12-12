use crate::consts::*;
use crate::errors::CustomError;

use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

#[account]
pub struct CurveConfiguration {
    pub fees: f64,
}

impl CurveConfiguration {
    pub const SEED: &'static str = "CurveConfiguration";

    // Discriminator (8) + f64 (8)
    pub const ACCOUNT_SIZE: usize = 8 + 32 + 8;

    pub fn new(fees: f64) -> Self {
        Self { fees }
    }
}
#[account]
pub struct LiquidityPool {
    pub creator: Pubkey,    // Public key of the pool creator
    pub token: Pubkey,      // Public key of the token in the liquidity pool
    pub total_supply: u64,  // Total supply of liquidity tokens
    pub reserve_token: u64, // Reserve amount of token in the pool
    pub reserve_sol: u64,   // Reserve amount of sol_token in the pool
    pub bump: u8,           // Nonce for the program-derived address
}

impl LiquidityPool {
    pub const POOL_SEED_PREFIX: &'static str = "liquidity_pool";
    pub const SOL_VAULT_PREFIX: &'static str = "liquidity_sol_vault";
    pub const POOL_TOKEN_VAULT: &'static str = "liquidity_token_vault";
    // Discriminator (8) + Pubkey (32) + Pubkey (32) + totalsupply (8)
    // + reserve one (8) + reserve two (8) + Bump (1)
    pub const ACCOUNT_SIZE: usize = 8 + 32 + 32 + 8 + 8 + 8 + 1;

    // Constructor to initialize a LiquidityPool with two tokens and a bump for the PDA
    pub fn new(creator: Pubkey, token: Pubkey, bump: u8) -> Self {
        Self {
            creator,
            token,
            total_supply: 0_u64,
            reserve_token: 0_u64,
            reserve_sol: 0_u64,
            bump,
        }
    }
}

pub trait LiquidityPoolAccount<'info> {
    // Updates the token reserves in the liquidity pool
    fn update_reserves(&mut self, reserve_token: u64, reserve_sol: u64) -> Result<()>;

    // Allows adding liquidity by depositing an amount of two tokens and getting back pool shares
    fn add_liquidity(
        &mut self,
        token_accounts: (
            &mut Account<'info, Mint>,
            &mut Account<'info, TokenAccount>,
            &mut Account<'info, TokenAccount>,
        ),
        pool_sol_vault: &mut AccountInfo<'info>,
        authority: &Signer<'info>,
        token_program: &Program<'info, Token>,
        system_program: &Program<'info, System>,
    ) -> Result<()>;

    // Allows removing liquidity by burning pool shares and receiving back a proportionate amount of tokens
    fn remove_liquidity(
        &mut self,
        token_accounts: (
            &mut Account<'info, Mint>,
            &mut Account<'info, TokenAccount>,
            &mut Account<'info, TokenAccount>,
        ),
        pool_sol_account: &mut AccountInfo<'info>,
        authority: &Signer<'info>,
        bump: u8,
        token_program: &Program<'info, Token>,
        system_program: &Program<'info, System>,
    ) -> Result<()>;

    fn buy(
        &mut self,
        // bonding_configuration_account: &Account<'info, CurveConfiguration>,
        token_accounts: (
            &mut Account<'info, Mint>,
            &mut Account<'info, TokenAccount>,
            &mut Account<'info, TokenAccount>,
        ),
        pool_sol_vault: &mut AccountInfo<'info>,
        amount: u64,
        authority: &Signer<'info>,
        token_program: &Program<'info, Token>,
        system_program: &Program<'info, System>,
        current_sol_price: f64,
    ) -> Result<()>;

    fn sell(
        &mut self,
        // bonding_configuration_account: &Account<'info, CurveConfiguration>,
        token_accounts: (
            &mut Account<'info, Mint>,
            &mut Account<'info, TokenAccount>,
            &mut Account<'info, TokenAccount>,
        ),
        pool_sol_vault: &mut AccountInfo<'info>,
        amount: u64,
        bump: u8,
        authority: &Signer<'info>,
        token_program: &Program<'info, Token>,
        system_program: &Program<'info, System>,
    ) -> Result<()>;

    fn transfer_token_from_pool(
        &self,
        from: &Account<'info, TokenAccount>,
        to: &Account<'info, TokenAccount>,
        amount: u64,
        token_program: &Program<'info, Token>,
    ) -> Result<()>;

    fn transfer_token_to_pool(
        &self,
        from: &Account<'info, TokenAccount>,
        to: &Account<'info, TokenAccount>,
        amount: u64,
        authority: &Signer<'info>,
        token_program: &Program<'info, Token>,
    ) -> Result<()>;

    fn transfer_sol_to_pool(
        &self,
        from: &Signer<'info>,
        to: &mut AccountInfo<'info>,
        amount: u64,
        system_program: &Program<'info, System>,
    ) -> Result<()>;

    fn transfer_sol_from_pool(
        &self,
        from: &mut AccountInfo<'info>,
        to: &Signer<'info>,
        amount: u64,
        bump: u8,
        system_program: &Program<'info, System>,
    ) -> Result<()>;
}

impl<'info> LiquidityPoolAccount<'info> for Account<'info, LiquidityPool> {
    fn update_reserves(&mut self, reserve_token: u64, reserve_sol: u64) -> Result<()> {
        self.reserve_token = reserve_token;
        self.reserve_sol = reserve_sol;
        Ok(())
    }

    fn add_liquidity(
        &mut self,
        token_accounts: (
            &mut Account<'info, Mint>,
            &mut Account<'info, TokenAccount>,
            &mut Account<'info, TokenAccount>,
        ),
        pool_sol_vault: &mut AccountInfo<'info>,
        authority: &Signer<'info>,
        token_program: &Program<'info, Token>,
        system_program: &Program<'info, System>,
    ) -> Result<()> {
        self.transfer_token_to_pool(
            token_accounts.2,
            token_accounts.1,
            token_accounts.0.supply,
            authority,
            token_program,
        )?;
        self.total_supply = token_accounts.0.supply;
        self.update_reserves(token_accounts.0.supply, INITIAL_SOL_AMOUNT * 1000000000)?;

        Ok(())
    }

    fn remove_liquidity(
        &mut self,
        token_accounts: (
            &mut Account<'info, Mint>,
            &mut Account<'info, TokenAccount>,
            &mut Account<'info, TokenAccount>,
        ),
        pool_sol_vault: &mut AccountInfo<'info>,
        authority: &Signer<'info>,
        bump: u8,
        token_program: &Program<'info, Token>,
        system_program: &Program<'info, System>,
    ) -> Result<()> {
        self.transfer_token_from_pool(
            token_accounts.1,
            token_accounts.2,
            token_accounts.1.amount as u64,
            token_program,
        )?;
        let amount = pool_sol_vault.to_account_info().lamports() as u64;
        self.transfer_sol_from_pool(pool_sol_vault, authority, amount, bump, system_program)?;

        Ok(())
    }

    fn buy(
        &mut self,
        token_accounts: (
            &mut Account<'info, Mint>,
            &mut Account<'info, TokenAccount>,
            &mut Account<'info, TokenAccount>,
        ),
        pool_sol_vault: &mut AccountInfo<'info>,
        amount: u64,
        authority: &Signer<'info>,
        token_program: &Program<'info, Token>,
        system_program: &Program<'info, System>,
        current_sol_price: f64,
    ) -> Result<()> {
        if amount == 0 {
            return err!(CustomError::InvalidAmount);
        }
        ///////////     --------------- Implement Bonding Curve   ------------        //////////

        let amount_out: u64 =
            (self.reserve_token * amount) / (self.reserve_sol + amount * 1000000000);

        ///////////     ---------------    -------------------    ------------        //////////
        self.reserve_sol += amount * 1000000000;
        self.reserve_token -= amount_out * 1000000000;
        self.transfer_sol_to_pool(
            authority,
            pool_sol_vault,
            amount * 1000000000,
            system_program,
        )?;

        self.transfer_token_from_pool(
            token_accounts.1,
            token_accounts.2,
            amount_out * 1000000000,
            token_program,
        )?;
        //////////      current MarketCap = current token price * token's supply     ///////////
        let mc: f64 = self.reserve_sol as f64 / 1000000000 as f64 / self.reserve_token as f64
            * self.total_supply as f64;
        //////////      if MarketCap is over given value, Token launch into other Dex, in this case Meteora     ////////////////
        if self.reserve_sol >= 115 * 1000000000 {
            msg!("CURRENT SOL is over 89 sol!");
        }

        Ok(())
    }

    fn sell(
        &mut self,
        token_accounts: (
            &mut Account<'info, Mint>,
            &mut Account<'info, TokenAccount>,
            &mut Account<'info, TokenAccount>,
        ),
        pool_sol_vault: &mut AccountInfo<'info>,
        amount: u64,
        bump: u8,
        authority: &Signer<'info>,
        token_program: &Program<'info, Token>,
        system_program: &Program<'info, System>,
    ) -> Result<()> {
        if amount == 0 {
            return err!(CustomError::InvalidAmount);
        }

        if self.reserve_token < amount * 100000000 {
            return err!(CustomError::TokenAmountToSellTooBig);
        }

        ///////////     --------------- Implement Bonding Curve   ------------        //////////

        let amount_out: u64 =
            (self.reserve_sol * amount) / (self.reserve_token + amount * 100000000);

        ///////////     ---------------    -------------------    ------------        //////////

        if self.reserve_sol < amount_out * 1000000000 {
            return err!(CustomError::NotEnoughSolInVault);
        }

        self.transfer_token_to_pool(
            token_accounts.2,
            token_accounts.1,
            amount * 1000000000,
            authority,
            token_program,
        )?;

        self.reserve_token += amount * 1000000000;
        self.reserve_sol -= amount_out * 1000000000;

        self.transfer_sol_from_pool(
            pool_sol_vault,
            authority,
            amount_out * 1000000000,
            bump,
            system_program,
        )?;

        Ok(())
    }

    fn transfer_token_from_pool(
        &self,
        from: &Account<'info, TokenAccount>,
        to: &Account<'info, TokenAccount>,
        amount: u64,
        token_program: &Program<'info, Token>,
    ) -> Result<()> {
        token::transfer(
            CpiContext::new_with_signer(
                token_program.to_account_info(),
                token::Transfer {
                    from: from.to_account_info(),
                    to: to.to_account_info(),
                    authority: self.to_account_info(),
                },
                &[&[
                    LiquidityPool::POOL_SEED_PREFIX.as_bytes(),
                    self.token.key().as_ref(),
                    &[self.bump],
                ]],
            ),
            amount,
        )?;
        Ok(())
    }

    fn transfer_token_to_pool(
        &self,
        from: &Account<'info, TokenAccount>,
        to: &Account<'info, TokenAccount>,
        amount: u64,
        authority: &Signer<'info>,
        token_program: &Program<'info, Token>,
    ) -> Result<()> {
        token::transfer(
            CpiContext::new(
                token_program.to_account_info(),
                token::Transfer {
                    from: from.to_account_info().clone(),
                    to: to.to_account_info().clone(),
                    authority: authority.to_account_info().clone(),
                },
            ),
            amount,
        )?;
        Ok(())
    }

    fn transfer_sol_from_pool(
        &self,
        from: &mut AccountInfo<'info>,
        to: &Signer<'info>,
        amount: u64,
        bump: u8,
        system_program: &Program<'info, System>,
    ) -> Result<()> {
        **from.to_account_info().try_borrow_mut_lamports()? -= amount;
        **to.try_borrow_mut_lamports()? += amount;
        Ok(())
    }

    fn transfer_sol_to_pool(
        &self,
        from: &Signer<'info>,
        to: &mut AccountInfo<'info>,
        amount: u64,
        system_program: &Program<'info, System>,
    ) -> Result<()> {
        system_program::transfer(
            CpiContext::new(
                system_program.to_account_info().clone(),
                system_program::Transfer {
                    from: from.to_account_info().clone(),
                    to: to.to_account_info().clone(),
                },
            ),
            amount,
        )?;
        Ok(())
    }
}
