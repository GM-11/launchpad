use anchor_lang::prelude::*;
use anchor_spl::{
    metadata::mpl_token_metadata::{
        instructions::CreateV1CpiBuilder,
        types::{ Creator, PrintSupply, TokenStandard },
    },
    token::Mint,
};

#[derive(Accounts)]
pub struct InitNewNft<'info> {
    /// CHECK:
    #[account(
        init,
        payer = signer,
        mint::decimals = 0,
        mint::authority = signer.key(),
        mint::freeze_authority = signer.key()
    )]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub signer: Signer<'info>,
    ///CHECK:
    #[account(mut)]
    pub metadata: AccountInfo<'info>,
    ///CHECK:
    pub system_program: AccountInfo<'info>,
    ///CHECK:
    pub sysvar_instructions: AccountInfo<'info>,
    ///CHECK:
    #[account(mut)]
    pub master_edition: AccountInfo<'info>,
    ///CHECK:
    pub token_program: AccountInfo<'info>,
    /// CHECK:
    pub mpl_token_metadata: AccountInfo<'info>,
}

pub fn init_new_nft(
    ctx: Context<InitNewNft>,
    name: String,
    uri: String,
    symbol: String
) -> Result<()> {
    let mint = ctx.accounts.mint.to_account_info();
    let system_program = ctx.accounts.system_program.to_account_info();
    let spl_token_program = ctx.accounts.token_program.to_account_info();
    let signer = ctx.accounts.signer.to_account_info();
    let metadata = ctx.accounts.metadata.to_account_info();
    let master_edition = ctx.accounts.master_edition.to_account_info();
    let sysvar_instructions = ctx.accounts.sysvar_instructions.to_account_info();
    let token_metadata_program = ctx.accounts.mpl_token_metadata.to_account_info();

    CreateV1CpiBuilder::new(&token_metadata_program)
        .name(name)
        .uri(uri)
        .decimals(0)
        .is_mutable(false)
        .authority(&signer)
        .payer(&signer)
        .system_program(&system_program)
        .update_authority(&signer, true)
        .metadata(&metadata)
        .master_edition(Some(&master_edition))
        .primary_sale_happened(false)
        .seller_fee_basis_points(500)
        .print_supply(PrintSupply::Zero)
        .symbol(symbol)
        .creators(vec![Creator { address: signer.clone().key(), verified: true, share: 100 }])
        .token_standard(TokenStandard::NonFungible)
        .mint(&mint, true)
        .sysvar_instructions(&sysvar_instructions)
        .spl_token_program(Some(&spl_token_program))
        .invoke()?;

    Ok(())
}
