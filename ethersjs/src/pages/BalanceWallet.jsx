import { useState } from 'react';
import { ethers } from 'ethers';

const { ethereum } = window;
function BalanceWallet() {

  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const signer = provider.getSigner();
    const address = signer.getAddress();
    
    const balanceWallet = await provider.getBalance(address);
    const convertBalance = ethers.utils.formatEther(balanceWallet);

    setBalance(convertBalance);
  };

  return (
    <div className="App">
        {!balance ? (
        <button onClick={getBalance} >Show Balance</button>
        ) : (
          <h3>Balance: {balance}</h3>
        )}
    </div>
  );

}

export default BalanceWallet;
