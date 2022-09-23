import { useState } from 'react';
import Web3 from "web3";

const { ethereum } = window;
function WalletConnect() {
  const [isConnect, setIsConnect] = useState(0);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const provider = await ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(provider);
      
      if(web3){
        setIsConnect(1);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
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

