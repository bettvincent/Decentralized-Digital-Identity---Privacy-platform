import React, { useState, useEffect } from "react";
import Web3 from "web3";
import IdentityContract from "./contracts/Identity.json";  // Import contract ABI

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const networkData = IdentityContract.networks[networkId];
        if (networkData) {
          const contract = new web3.eth.Contract(IdentityContract.abi, networkData.address);
          setContract(contract);
        } else {
          alert("Smart contract not deployed to detected network.");
        }
      }
    };

    loadBlockchainData();
  }, []);

  const createIdentity = async (name, email, publicKey) => {
    await contract.methods.createIdentity(name, email, publicKey).send({ from: account });
  };

  return (
    <div>
      <h1>Decentralized Identity</h1>
      <p>Your account: {account}</p>
      <button onClick={() => createIdentity("John Doe", "john@example.com", "publicKeyHere")}>
        Create Identity
      </button>
    </div>
  );
};

export default App;
