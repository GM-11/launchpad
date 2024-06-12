import React from "react";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "120%",
        position: "absolute",
        top: "0",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <h1
        style={{
          fontSize: "5rem",
        }}
      >
        LOADING
      </h1>
      <p>Please approve the transactions from your wallet</p>
    </div>
  );
}

export default Loading;
