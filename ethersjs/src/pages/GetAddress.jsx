import { useState } from 'react';
import { ethers } from 'ethers';

const { ethereum } = window;
function GetAddress() {

  const [walletAddress, setWalletAddress] = useState("");

  const showAddress = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);   
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  return (
    <div className="App">
        {!walletAddress ? (
        <button onClick={showAddress} >Show Address</button>
        ) : (
          <h3>Wallet Address: {walletAddress}</h3>
        )}
    </div>
  );

}

export default GetAddress;
