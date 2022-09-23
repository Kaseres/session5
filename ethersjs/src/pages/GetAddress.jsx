import { useState } from 'react';
import { ethers } from 'ethers';

const { ethereum } = window;
function GetAddress() {

  const [walletAddress, setWalletAddress] = useState("");

  const showAddress = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log('signer', signer, 'address',address);
    
    setWalletAddress(address);  
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
