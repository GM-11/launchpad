import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  ChangeEvent,
} from "react";
import useIPFS from "../hooks/useIPFS";
import useToken from "../hooks/useToken";
import Loading from "./Loading";

const NewTokenForm: React.FC = () => {
  const [name, setName] = React.useState<string>("");
  const [symbol, setSymbol] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [amount, setAmount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const { uploadToken } = useIPFS();
  const { initNewToken, mintNewToken } = useToken();

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value.trim()),
    []
  );
  const handleSymbolChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value.trim()),
    []
  );
  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value.trim()),
    []
  );
  const handleAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setAmount(parseInt(e.target.value)),
    []
  );

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  }, []);

  const imagePreviewUrl = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : ""),
    [imageFile]
  );

  const handleButtonClick = async () => {
    setIsLoading(true);

    if (!name || !symbol || !description || !imageFile) {
      alert("Please fill all the fields");
      setIsLoading(false);

      return;
    }

    if (symbol.length !== 3 && symbol.length !== 4) {
      alert("Symbol length should be 3 or 4");
      setIsLoading(false);
      return;
    }

    if (name.length < 3) {
      alert("Name should be at least 3 characters");
      setIsLoading(false);
      return;
    }

    if (!imageFile) {
      alert("Please select an image");
      setIsLoading(false);

      return;
    }
    const result = await uploadToken(name, symbol, description, imageFile);
    if (!result.metadataURI) {
      setIsLoading(false);

      return;
    }

    const mint = await initNewToken(name, result.metadataURI, symbol);

    if (mint) {
      await mintNewToken(mint, amount);
    }

    setIsLoading(false);

    setName("");
    setSymbol("");
    setDescription("");
    setImageFile(null);
    setAmount(0);
  };

  return (
    <>
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
              value={name}
              onChange={handleNameChange}
              type="text"
              placeholder="Name"
            />
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
          <input
            onChange={handleAmountChange}
            type="number"
            value={amount}
            placeholder="Amount to mint"
          />

          <button onClick={handleButtonClick}>CREATE TOKEN</button>
        </div>
        <ImagePreview
          imagePreviewUrl={imagePreviewUrl}
          handleImageChange={handleImageChange}
        />
      </div>

      {isLoading && <Loading />}
    </>
  );
};

type ImagePreviewProps = {
  imagePreviewUrl: string;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

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
          border: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : `none`,
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
        <label htmlFor="nftImageInput"> Upload Token Image </label>
      </div>
    </div>
  );
};

export default NewTokenForm;
