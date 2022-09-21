import { useState } from 'react';
import Web3 from "web3";

function GetAddress() {
  const [walletAddress, setWalletAddress] = useState("");

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const showAddress = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      await currentProvider.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(currentProvider);
      const accounts = await web3.eth.getAccounts();
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  return (
    <div>
        {!walletAddress ? (
        <button onClick={showAddress} >Show Address</button>
        ) : (
          <>
            <h3>Wallet Address: {walletAddress}</h3>
          </>
        )}
    </div>
  );
}

export default GetAddress;
