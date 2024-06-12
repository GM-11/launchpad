import { AnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import { Launchpad } from "./Launchpad";

export type AnchorClient = {
  wallet: AnchorWallet;
  network: String;
  connection: Connection;
  programId: anchor.web3.PublicKey;
  provider: anchor.AnchorProvider;
  systemProgram: anchor.web3.PublicKey;
  sysvarInstructions: anchor.web3.PublicKey;
  program: anchor.Program<Launchpad>;
};
