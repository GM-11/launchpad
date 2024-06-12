pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;

declare_id!("5noUdXL9uS5pNnmsxSfEHYo2yXBYkRwQJRpYd5AfqaHJ");

#[program]
pub mod launchpad {
    use super::*;

    pub fn init_new_token_inx(
        ctx: Context<InitNewToken>,
        name: String,
        symbol: String,
        uri: String,
    ) -> Result<()> {
        init_new_token(ctx, name, uri, symbol)
    }

    pub fn mint_new_token_inx(ctx: Context<MintNewToken>, amount: u64) -> Result<()> {
        mint_new_token(ctx, amount)
    }

    pub fn init_new_nft_inx(
        ctx: Context<InitNewNft>,
        name: String,
        symbol: String,
        uri: String
    ) -> Result<()> {
        init_new_nft(ctx, name, uri, symbol)
    }

    pub fn mint_new_nft_inx(ctx: Context<MintNewNFT>) -> Result<()> {
        mint_new(ctx)
    }
}
