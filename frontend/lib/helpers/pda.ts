import * as anchor from "@coral-xyz/anchor";
import { MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

export const mplID = new anchor.web3.PublicKey(
  MPL_TOKEN_METADATA_PROGRAM_ID.toString()
);

export async function getMetadataPDA(mint: anchor.web3.PublicKey) {
  const [metadata] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), mplID.toBuffer(), mint.toBuffer()],
    mplID
  );
  return metadata;
}

export async function getMasterEditionPDA(mint: anchor.web3.PublicKey) {
  const [masterEdition] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      mplID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    mplID
  );
  return masterEdition;
}