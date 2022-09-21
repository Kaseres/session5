import { useState } from 'react';
import Web3 from "web3";
import CallABI from '../utils/CallABI.json'

function BalanceContract() {

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

  const getBalanceContract = async () => {
    const currentProvider = detectCurrentProvider();
    await currentProvider.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(currentProvider);

    const contract = new web3.eth.Contract(
      CallABI, 
      '0x86B4254dE2f7c7E85D68C129fac688544Ce0D9a1'
    )
    const getContractBalance = await contract.methods.getBalance().call(); 

    const convertContractBalance = web3.utils.fromWei(getContractBalance, "ether");
    setBalance(convertContractBalance);
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
