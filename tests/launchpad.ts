import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { Launchpad } from "../target/types/launchpad";

describe("launchpad", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.TokenLaunchpad as Program<Launchpad>;

  const mint_nft = anchor.web3.Keypair.generate();
  const mint_token = anchor.web3.Keypair.generate();

  const mplID = new anchor.web3.PublicKey(
    MPL_TOKEN_METADATA_PROGRAM_ID.toString()
  );

  const sysvarInstructions = new anchor.web3.PublicKey(
    "11111111111111111111111111111111"
  );

  const wallet = anchor.web3.Keypair.fromSecretKey(
    new Uint8Array([
      226, 35, 5, 99, 62, 0, 202, 188, 213, 175, 153, 243, 174, 198, 106, 241,
      108, 237, 20, 49, 139, 29, 34, 27, 244, 34, 164, 147, 111, 66, 85, 224,
      49, 94, 254, 211, 254, 121, 133, 214, 21, 243, 65, 235, 186, 117, 102,
      250, 20, 118, 208, 194, 24, 49, 101, 42, 83, 113, 20, 101, 21, 222, 18,
      120,
    ])
  );

  const uri =
    "https://ivory-absolute-pony-623.mypinata.cloud/ipfs/QmX2z4s8WWzNebgj1zSMERqzrsQvQhwFZzUEa9SVpCuBC3";
  const name = "SolanaArtProject";
  const symbol = "GEN";

  const systemProgram = anchor.web3.SystemProgram.programId;

  const [metadata] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      mplID.toBuffer(),
      mint_token.publicKey.toBuffer(),
    ],
    mplID
  );
  const [masterEdition] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      mplID.toBuffer(),
      mint_token.publicKey.toBuffer(),
      Buffer.from("edition"),
    ],
    mplID
  );

  it("Created new token", async () => {
    try {
      const tx = await program.methods
        .initNewTokenInx(name, symbol, uri)
        .accountsPartial({
          mint: mint_token.publicKey,
          signer: wallet.publicKey,
          metadata,
          systemProgram,
          sysvarInstructions,
          masterEdition,
          tokenProgram: TOKEN_PROGRAM_ID,
          mplTokenMetadata: MPL_TOKEN_METADATA_PROGRAM_ID,
        })
        .signers([wallet, mint_token])
        .rpc();
      console.log(`Transaction id: ${tx}`);
      console.log(`Mint account: ${mint_token.publicKey.toBase58()}`);
      console.log(`Metadata account: ${metadata}`);
      console.log(`Master Edition account: ${masterEdition}`);
    } catch (error) {
      console.log(error);
    }
  });

  it("Minted new token", async () => {
    const token_ata = await getAssociatedTokenAddress(
      mint_token.publicKey,
      wallet.publicKey
    );

    try {
      const tx = await program.methods
        .mintNewTokenInx(new anchor.BN(100))
        .accounts({
          signer: wallet.publicKey,
          mint: mint_token.publicKey,
          metadata,
          systemProgram,
          sysvarInstructions,
          masterEdition: masterEdition,
          tokenProgram: TOKEN_PROGRAM_ID,
          mplTokenMetadata: MPL_TOKEN_METADATA_PROGRAM_ID,
          destination: wallet.publicKey,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          token: token_ata,
        })
        .signers([wallet])
        .rpc();

      console.log(`Transaction id: ${tx}`);
      console.log(`Mint account: ${mint_token.publicKey.toBase58()}`);
      console.log(`Metadata account: ${metadata}`);
      console.log(`Master Edition account: ${masterEdition}`);
    } catch (error) {
      console.log(error);
    }
  });

  it("Create NFT", async () => {
    try {
      const tx = await program.methods
        .initNewNftInx(name, symbol, uri)
        .accounts({
          mint: mint_nft.publicKey,
          signer: wallet.publicKey,
          metadata,
          systemProgram,
          sysvarInstructions,
          masterEdition,
          tokenProgram: TOKEN_PROGRAM_ID,
          mplTokenMetadata: MPL_TOKEN_METADATA_PROGRAM_ID,
        })
        .signers([wallet, mint_nft])
        .rpc();

      console.log(`Transaction id: ${tx}`);
      console.log(`Mint account: ${mint_nft.publicKey.toBase58()}`);
      console.log(`Metadata account: ${metadata}`);
      console.log(`Master Edition account: ${masterEdition}`);
    } catch (error) {
      console.log(error);
    }
  });

  it("mint NFT", async () => {
    const token_ata = await getAssociatedTokenAddress(
      mint_nft.publicKey,
      wallet.publicKey
    );

    try {
      const tx = await program.methods
        .mintNewNftInx()
        .accountsPartial({
          signer: wallet.publicKey,
          mint: mint_token.publicKey,
          metadata,
          systemProgram,
          sysvarInstructions,
          masterEdition: masterEdition,
          tokenProgram: TOKEN_PROGRAM_ID,
          mplTokenMetadata: MPL_TOKEN_METADATA_PROGRAM_ID,
          destination: wallet.publicKey,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          token: token_ata,
        })
        .signers([wallet])
        .rpc();

      console.log(`Transaction id: ${tx}`);
      console.log(`Mint account: ${mint_nft.publicKey.toBase58()}`);
      console.log(`Metadata account: ${metadata}`);
      console.log(`Master Edition account: ${masterEdition}`);
    } catch (error) {
      console.log(error);
    }
  });
});


