import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { ConfirmOptions, PublicKey, clusterApiUrl } from "@solana/web3.js";

import idl from "../types/idl.json";
import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { AnchorClient } from "../types/AnchorClient";
import { useEffect } from "react";
import { Launchpad } from "../types/Launchpad";

export default function useAnchorClient() {
  const wallet = useAnchorWallet();
  const { connect, connected } = useWallet();
  const { connection } = useConnection();

  const network = clusterApiUrl("devnet");
  const programId = new PublicKey(idl.address);
  const systemProgram = web3.SystemProgram.programId;

  const opts = {
    preflightCommitment: "processed" as ConfirmOptions,
  };
  const provider = new AnchorProvider(
    connection,
    wallet as AnchorWallet,
    opts.preflightCommitment
  );

  const program = new Program<Launchpad>(
    JSON.parse(JSON.stringify(idl)),
    provider
  );

  const sysvarInstructions = new web3.PublicKey(
    "11111111111111111111111111111111"
  );

  useEffect(() => {
    async function connectWallet() {
      await connect();
    }

    connectWallet();
  }, [connect]);

  if (wallet && connected) {
    const anchorClient: AnchorClient = {
      wallet,
      network,
      programId,
      connection,
      provider,
      program,
      systemProgram,
      sysvarInstructions,
    };

    return anchorClient;
  } else {
    return {} as AnchorClient;
  }
}
