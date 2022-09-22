import { useState } from 'react';
import Web3 from "web3";

const { ethereum } = window;
function BalanceWallet() {

  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const web3 = new Web3(ethereum);
    const accounts = await web3.eth.getAccounts();

    const balanceWallet = await web3.eth.getBalance(accounts[0]);
    const convertBalance = web3.utils.fromWei(balanceWallet, "ether");
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
