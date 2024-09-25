import { create } from "ipfs-http-client";

const ipfs = create("https://ipfs.infura.io:5001/api/v0");

export const storeDataOnIPFS = async (data) => {
  const result = await ipfs.add(JSON.stringify(data));
  return result.path;  // Return the IPFS hash
};

export const retrieveDataFromIPFS = async (hash) => {
  const response = await fetch(`https://ipfs.infura.io/ipfs/${hash}`);
  const data = await response.json();
  return data;
};
