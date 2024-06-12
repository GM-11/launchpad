import * as anchor from "@coral-xyz/anchor";
import useAnchorClient from "./useAnchorClient";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { getMasterEditionPDA, getMetadataPDA } from "../helpers/pda";

export function useNFT() {
  const { program, wallet, sysvarInstructions, systemProgram } =
    useAnchorClient();

  async function initNewNFT(
    name: string,
    metadata_uri: string,
    symbol: string
  ) {
    const mint = anchor.web3.Keypair.generate();

    const metadata = await getMetadataPDA(mint.publicKey);

    const masterEdition = await getMasterEditionPDA(mint.publicKey);
    try {
      console.log("here")
      const tx = await program.methods
        .initNewNftInx(name, symbol, metadata_uri)
        .accountsPartial({
          mint: mint.publicKey,
          signer: wallet.publicKey,
          systemProgram,
          sysvarInstructions,
          metadata,
          masterEdition,
          tokenProgram: TOKEN_PROGRAM_ID,
          mplTokenMetadata: MPL_TOKEN_METADATA_PROGRAM_ID,
        })
        .signers([mint])
        .rpc();

      console.log(`Transaction Signature for TX1: ${tx}`);
      console.log(`Mint account: ${mint.publicKey.toBase58()}`);
      return mint.publicKey;
    } catch (error) {
      console.log(error);
    }
  }

  async function mintNewNFT(mint: anchor.web3.PublicKey) {
    const metadata = await getMetadataPDA(mint);
    const masterEdition = await getMasterEditionPDA(mint);
    const dexTokenAta = await getAssociatedTokenAddress(mint, wallet.publicKey);

    try {
      const tx = await program.methods
        .mintNewNftInx()
        .accountsPartial({
          metadata,
          mint,
          destination: wallet.publicKey,
          mplTokenMetadata: MPL_TOKEN_METADATA_PROGRAM_ID,
          masterEdition,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          signer: wallet.publicKey,
          systemProgram,
          sysvarInstructions,
          tokenProgram: TOKEN_PROGRAM_ID,
          token: dexTokenAta,
        })
        .rpc();
      console.log(`Transaction Signature: ${tx}`);
    } catch (error) {
      console.log(error);
    }
  }

  return { initNewNFT, mintNewNFT };
}
