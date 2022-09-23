import { useState } from 'react';
import Web3 from "web3";
import CallABI from '../utils/CallABI.json'

const { ethereum } = window;
function BalanceContract() {
  const [balance, setBalance] = useState(0);

  const getBalanceContract = async () => {
    const web3 = new Web3(ethereum);

    const contract = new web3.eth.Contract(
      CallABI, 
      '0x86B4254dE2f7c7E85D68C129fac688544Ce0D9a1'
    );

    const contractBalance = await contract.methods.getBalance().call(); 
    const convertBalance = web3.utils.fromWei(contractBalance, "ether");
    console.log('contract',contract,'contractBalance',contractBalance,'convertBalance',convertBalance);

    setBalance(convertBalance);
  };

  return (
    <div className="App">
        {!balance ? (
        <button onClick={getBalanceContract} >Show Contract Balance</button>
        ) : (
            <h3>Contract Balance: {balance} ETH</h3>
        )}
    </div>
  );
}

export default BalanceContract;
