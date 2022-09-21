import { useState } from 'react';
import { ethers } from 'ethers';

const { ethereum } = window;
function BalanceWallet() {

  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const accounts = await provider.send("eth_requestAccounts", []);
    const getBalanceWallet = await provider.getBalance(accounts[0]);
    const convertBalance = ethers.utils.formatEther(getBalanceWallet);

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
