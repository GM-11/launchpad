use anchor_lang::prelude::*;
use anchor_spl::{
    metadata::mpl_token_metadata::instructions::MintV1CpiBuilder,
    token::{ Mint, TokenAccount },
};

#[derive(Accounts)]
pub struct MintNewNFT<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    /// CHECK:
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    /// CHECK:
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
    /// CHECK:
    pub destination: AccountInfo<'info>,
    /// CHECK:
    pub associated_token_program: AccountInfo<'info>,
    /// CHECK:
    #[account(
        init_if_needed,
        payer = signer,
        associated_token::mint = mint,
        associated_token::authority = signer
    )]
    pub token: Account<'info, TokenAccount>,
}

pub fn mint_new(ctx: Context<MintNewNFT>) -> Result<()> {
    let mint = ctx.accounts.mint.to_account_info();
    let system_program = ctx.accounts.system_program.to_account_info();
    let spl_token_program = ctx.accounts.token_program.to_account_info();
    let signer = ctx.accounts.signer.to_account_info();
    let metadata = ctx.accounts.metadata.to_account_info();
    let master_edition = ctx.accounts.master_edition.to_account_info();
    let sysvar_instructions = ctx.accounts.sysvar_instructions.to_account_info();
    let token_metadata_program = ctx.accounts.mpl_token_metadata.to_account_info();
    let spl_ata_program = ctx.accounts.associated_token_program.to_account_info();
    let destination = ctx.accounts.destination.to_account_info();
    let token = ctx.accounts.token.to_account_info();

    MintV1CpiBuilder::new(&token_metadata_program)
        .token(&token)
        .token_owner(Some(&destination))
        .metadata(&metadata)
        .master_edition(Some(&master_edition))
        .mint(&mint)
        .payer(&signer)
        .authority(&signer)
        .system_program(&system_program)
        .sysvar_instructions(&sysvar_instructions)
        .spl_token_program(&spl_token_program)
        .spl_ata_program(&spl_ata_program)
        .amount(1)
        .invoke()?;

    Ok(())
}
