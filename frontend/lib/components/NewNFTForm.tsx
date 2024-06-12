import React from "react";
import useIPFS from "../hooks/useIPFS";
import { useNFT } from "../hooks/useNFT";
import Image from "next/image";

type attribute = {
  trait_type: String;
  value: String;
};

function NewNFTForm() {
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [attributes, setAttributes] = React.useState<attribute[]>([
    {
      trait_type: "",
      value: "",
    },
  ]);
  const [numAttributes, setNumAttributes] = React.useState<number>(1);

  const { uploadToken } = useIPFS();
  const { initNewNFT, mintNewNFT } = useNFT();

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

        <section
          className="attributes"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {Array.from({ length: numAttributes }, (_, i) => {
            return (
              <section key={i} className="attributes-input">
                <input
                  onChange={(e) => {
                    const current = attributes[i];
                    current.trait_type = e.target.value.trim();
                    setAttributes([...attributes]);
                  }}
                  type="text"
                  placeholder="Trait"
                />
                <input
                  onChange={(e) => {
                    const current = attributes[i];
                    current.value = e.target.value.trim();
                    setAttributes([...attributes]);
                  }}
                  type="text"
                  placeholder="Value"
                />

                <button
                  onClick={() => {
                    setAttributes(attributes.filter((_, index) => index !== i));
                    setNumAttributes(numAttributes - 1);
                  }}
                  style={{
                    width: "min-content",
                    padding: "0.25rem;",
                  }}
                >
                  -
                </button>
              </section>
            );
          })}

          <button
            onClick={() => {
              setNumAttributes(numAttributes + 1);
              setAttributes([...attributes, { trait_type: "", value: "" }]);
              console.log(attributes);
            }}
            style={{
              width: "35%",
            }}
          >
            Add trait
          </button>
        </section>

        <button
          onClick={async () => {
            if (name === "" || symbol === "" || description === "") {
              alert("Please fill in all fields");
              return;
            }

            const areAttributesFilled = attributes.every(
              (attr) => attr.trait_type !== "" && attr.value !== ""
            );
            if (!areAttributesFilled) {
              alert("Please fill in all attribute fields");
              return;
            }

            if (!imageFile) {
              return;
            }
            const result = await uploadToken(
              name,
              symbol,
              description,
              imageFile
            );

            if (!result.metadataURI) {
              alert(result.message);
              return;
            }
            const mint = await initNewNFT(name, result.metadataURI, symbol);
            if (mint) {
              await mintNewNFT(mint);
            }
          }}
        >
          CREATE NFT
        </button>
      </div>
      <div
        style={{
          flex: "1",
        }}
      >
        <div
          style={{
            height: "350px",
            width: "350px",
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            backgroundImage: imageFile
              ? `url(${URL.createObjectURL(imageFile)})`
              : `none`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <input
            style={{
              backgroundColor: "transparent",
            }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}
            type="file"
            accept="image/png"
            id="nftImageInput"
            placeholder="Image"
          />

          <label htmlFor="nftImageInput"> Upload NFT Image </label>
        </div>{" "}
      </div>
    </div>
  );
}

export default NewNFTForm;
