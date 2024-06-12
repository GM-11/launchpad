"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

function Navbar() {
  return (
    <nav>
      <h1>LAUNCHPAD</h1>
      <WalletMultiButton />
    </nav>
  );
}

export default Navbar;
