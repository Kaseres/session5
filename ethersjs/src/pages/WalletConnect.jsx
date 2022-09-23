import { useState } from 'react';
import { ethers } from 'ethers';

const { ethereum } = window;
function WalletConnect() {
  const [isConnect, setIsConnect] = useState(0);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const connect = await provider.send("eth_requestAccounts", []);
      
      if(connect){
        setIsConnect(1);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  return (
    <div className="App">
        {!isConnect ? (
        <button onClick={connectWallet} >Connect Wallet</button>
        ) : (
          <h3>You Connect: Connected</h3>
        )}
    </div>
  );
}

export default WalletConnect;

