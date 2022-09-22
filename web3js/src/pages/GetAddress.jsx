import { useState } from 'react';
import Web3 from "web3";

const { ethereum } = window;
function GetAddress() {
  const [walletAddress, setWalletAddress] = useState("");

  const showAddress = async () => {
    const web3 = new Web3(ethereum);
    const accounts = await web3.eth.getAccounts();

    setWalletAddress(accounts[0]);
  };

  return (
    <div className="App">
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
