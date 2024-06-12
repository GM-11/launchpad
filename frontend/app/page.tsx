"use client";
import React from "react";
import NewNFTForm from "../lib/components/NewNFTForm";
import NewTokenForm from "../lib/components/NewTokenForm";
import Navbar from "@/lib/components/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  const [selected, setSelected] = React.useState(0);
  const { connected } = useWallet();
  return (
    <>
      <Navbar />

      {connected ? (
        <>
          <main>
            <div
              className="tab"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <section
                onClick={() => setSelected(0)}
                className="tab-heading"
                style={
                  selected === 0
                    ? {
                        backgroundColor: "var(--accent-color)",
                      }
                    : {}
                }
              >
                <h2> TOKEN</h2>
              </section>
              <section
                onClick={() => setSelected(1)}
                className="tab-heading"
                style={
                  selected === 1
                    ? {
                        backgroundColor: "var(--accent-color)",
                      }
                    : {}
                }
              >
                <h2> NFT</h2>
              </section>
            </div>

            {selected === 0 ? <NewTokenForm /> : <NewNFTForm />}
          </main>
        </>
      ) : (
        <>
          <main>
            <h1>Please connect your wallet</h1>
          </main>
        </>
      )}
    </>
  );
}

export default App;
