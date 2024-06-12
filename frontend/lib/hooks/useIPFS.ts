import axios from "axios";

export default function useIPFS() {
  function parseHashToURI(hash: String) {
    return `https://ivory-absolute-pony-623.mypinata.cloud/ipfs/${hash}`;
  }

  async function uploadToken(
    name: String,
    symbol: String,
    description: String,
    imageFile: File,
    attributes?: any[]
  ) {
    try {
      const formData = new FormData();
      formData.append("file", imageFile as Blob);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
          pinata_secret_api_key: `${process.env.NEXT_PUBLIC_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });

      let metadata;

      if (attributes) {
        metadata = {
          name,
          symbol,
          description,
          image: parseHashToURI(resFile.data.IpfsHash),
          attributes,
        };
      } else {
        metadata = {
          name,
          symbol,
          description,
          image: parseHashToURI(resFile.data.IpfsHash),
        };
      }

      const resMetadata = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: metadata,
        headers: {
          pinata_api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
          pinata_secret_api_key: `${process.env.NEXT_PUBLIC_API_SECRET}`,
          "Content-Type": "application/json",
        },
      });

      return {
        imageURI: parseHashToURI(resFile.data.IpfsHash),
        metadataURI: parseHashToURI(resMetadata.data.IpfsHash),
      };
    } catch (error) {
      console.log(error);

      return {
        message: "Some error occured",
      };
    }
  }

  return { uploadToken };
}
