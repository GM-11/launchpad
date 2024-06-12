import React from "react";
import useIPFS from "../hooks/useIPFS";
import useToken from "../hooks/useToken";
import Image from "next/image";
function NewTokenForm() {
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [amount, setAmount] = React.useState<number>(0);

  const { uploadToken } = useIPFS();
  const { initNewToken, mintNewToken } = useToken();

  return (
    <div className="form">
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <section className="input-section">
          <input
            onChange={(e) => setName(e.target.value.trim())}
            type="text"
            placeholder="Name"
          />
          <input
            onChange={(e) => setSymbol(e.target.value.trim())}
            type="text"
            placeholder="Symbol"
          />
        </section>
        <input
          onChange={(e) => setDescription(e.target.value.trim())}
          type="text"
          placeholder="Description"
        />
        <input
          onChange={(e) => setAmount(parseInt(e.target.value))}
          type="number"
          placeholder="Amount to mint"
        />

        <button
          onClick={async () => {
            if (!name || !symbol || !description || !imageFile) {
              alert("Please fill all the fields");
              return;
            }

            if (!imageFile) {
              alert("Please select and image");
              return;
            }
            const result = await uploadToken(
              name,
              symbol,
              description,
              imageFile
            );
            if (!result.metadataURI) {
              return;
            }

            const mint = await initNewToken(name, result.metadataURI, symbol);

            if (mint) {
              await mintNewToken(mint, amount);
            }
          }}
        >
          CREATE TOKEN
        </button>
      </div>

      <div style={{ flex: "1" }}>
        <div
          style={{
            height: "350px",
            width: "350px",
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100%",
            backgroundImage: imageFile
              ? `url(${URL.createObjectURL(imageFile)})`
              : `none`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <input
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}
            type="file"
            id="tokenImageInput"
            accept="image/png"
            placeholder="Image"
            color="transparent"
          />

          <label htmlFor="tokenImageInput"> Upload Token Image </label>
        </div>
      </div>
    </div>
  );
}

export default NewTokenForm;
