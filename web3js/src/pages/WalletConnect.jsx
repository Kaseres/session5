import { useState } from 'react';
import Web3 from "web3";

function WalletConnect() {
  const [isConnect, setIsConnect] = useState(0);

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      alert("Please install metamask");
    }
    return provider;
  };

  const connectWallet = async () => {
    try {
      const provider = detectCurrentProvider();
      await provider.request({ method: "eth_requestAccounts" });
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
    <div>
        {!isConnect ? (
        <button onClick={connectWallet} >Connect Wallet</button>
        ) : (
          <>
            <h3>You Connect: Connected</h3>
          </>
        )}
    </div>
  );
}
export default WalletConnect;
