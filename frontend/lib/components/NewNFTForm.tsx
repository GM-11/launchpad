import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import useIPFS from "../hooks/useIPFS";
import { useNFT } from "../hooks/useNFT";
import Image from "next/image";
import Loading from "./Loading";

type attribute = {
  trait_type: String;
  value: String;
};

function NewNFTForm() {
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [attributes, setAttributes] = React.useState<attribute[]>([
    {
      trait_type: "",
      value: "",
    },
  ]);
  const [numAttributes, setNumAttributes] = React.useState<number>(1);

  const { uploadToken } = useIPFS();
  const { initNewNFT, mintNewNFT } = useNFT();

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  );
  const handleSymbolChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value),
    []
  );
  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
    []
  );

  const handleTraitTypeChange = useCallback(
    (index: number, e: ChangeEvent<HTMLInputElement>) => {
      const newAttributes = [...attributes];
      newAttributes[index].trait_type = e.target.value;
      setAttributes(newAttributes);
    },
    [attributes]
  );

  const handleValueChange = useCallback(
    (index: number, e: ChangeEvent<HTMLInputElement>) => {
      const newAttributes = [...attributes];
      newAttributes[index].value = e.target.value;
      setAttributes(newAttributes);
    },
    [attributes]
  );

  const handleAddAttribute = useCallback(() => {
    setNumAttributes(numAttributes + 1);
    setAttributes([...attributes, { trait_type: "", value: "" }]);
  }, [numAttributes, attributes]);

  const handleRemoveAttribute = useCallback(
    (index: number) => {
      const newAttributes = attributes.filter((_, i) => i !== index);
      setAttributes(newAttributes);
      setNumAttributes(numAttributes - 1);
    },
    [attributes, numAttributes]
  );

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  }, []);

  const imagePreviewUrl = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : ""),
    [imageFile]
  );

  return (
    <>
      <div className="form">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <section className="input-section">
            <input value={name} onChange={handleNameChange} type="text" placeholder="Name" />
            <input
              onChange={handleSymbolChange}
              type="text"
              value={symbol}
              placeholder="Symbol"
            />
          </section>
          <input
            onChange={handleDescriptionChange}
            type="text"
            value={description}
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
                    onChange={(e) => handleTraitTypeChange(i, e)}
                    type="text"
                    placeholder="Trait"
                  />
                  <input
                    onChange={(e) => handleValueChange(i, e)}
                    type="text"
                    placeholder="Value"
                  />

                  <button
                    onClick={() => handleRemoveAttribute(i)}
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
              onClick={handleAddAttribute}
              style={{
                width: "35%",
              }}
            >
              Add trait
            </button>
          </section>

          <button
            onClick={async () => {
              setIsLoading(true);
              if (name === "" || symbol === "" || description === "") {
                alert("Please fill in all fields");
                setIsLoading(false);
                return;
              }

              const areAttributesFilled = attributes.every(
                (attr) => attr.trait_type !== "" && attr.value !== ""
              );
              if (!areAttributesFilled) {
                alert("Please fill in all attribute fields");
                setIsLoading(false);
                return;
              }

              if (!imageFile) {
                setIsLoading(false);
                return;
              }
              const result = await uploadToken(
                name.trim(),
                symbol.trim(),
                description.trim(),
                imageFile
              );

              if (!result.metadataURI) {
                alert(result.message);
                setIsLoading(false);
                return;
              }
              const mint = await initNewNFT(name, result.metadataURI, symbol);
              if (mint) {
                await mintNewNFT(mint);
              }
              setIsLoading(false);
              setName("");
              setSymbol("");
              setDescription("");
              setImageFile(null);
              setAttributes([{ trait_type: "", value: "" }]);
              setNumAttributes(1);
            }}
          >
            CREATE NFT
          </button>
        </div>
        <ImagePreview
          imagePreviewUrl={imagePreviewUrl}
          handleImageChange={handleImageChange}
        />
      </div>

      {isLoading && <Loading />}
    </>
  );
}
interface ImagePreviewProps {
  imagePreviewUrl: string;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imagePreviewUrl,
  handleImageChange,
}) => {
  return (
    <div
      style={{
        flex: "1",
      }}
    >
      <div
        style={{
          height: "350px",
          width: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <input
          style={{
            backgroundColor: "transparent",
          }}
          onChange={handleImageChange}
          type="file"
          accept="image/png"
          id="nftImageInput"
          placeholder="Image"
        />
        <label htmlFor="nftImageInput"> Upload NFT Image </label>
      </div>
    </div>
  );
};

export default NewNFTForm;
