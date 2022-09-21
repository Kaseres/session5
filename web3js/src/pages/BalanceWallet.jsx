import { useState } from 'react';
import Web3 from "web3";

function BalanceWallet() {

  const [balance, setBalance] = useState(0);

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

  const getBalance = async () => {
    const currentProvider = detectCurrentProvider();
    await currentProvider.request({ method: "eth_requestAccounts" });

    const web3 = new Web3(currentProvider);
    const accounts = await web3.eth.getAccounts();

    const getBalanceWallet = await web3.eth.getBalance(accounts[0]);
    const convertBalance = web3.utils.fromWei(getBalanceWallet, "ether");
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
