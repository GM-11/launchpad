import React from "react";
import NewTokenForm from "./NewTokenForm";
import NewNFTForm from "./NewNFTForm";

function LaunchForm() {
  const [selected, setSelected] = React.useState(0);

  return (
    <div>
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
    </div>
  );
}

export default LaunchForm;
