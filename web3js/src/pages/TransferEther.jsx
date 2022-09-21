import { useState } from 'react';
import Web3 from "web3";
import CallABI from '../utils/CallABI.json'

function TransferEther() {

  const [amount, setAmount] = useState(0);

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

  const sendEthers = async () => {
    const currentProvider = detectCurrentProvider();
    await currentProvider.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(currentProvider);

    const contract = new web3.eth.Contract(
      CallABI, 
      '0x86B4254dE2f7c7E85D68C129fac688544Ce0D9a1'
    )
    
    const accounts = await web3.eth.getAccounts();
    
    await contract.methods.transferEther().send( 
      {from: accounts[0], value: Web3.utils.toWei(amount) }
    ); 
  };

  const inputAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="App">
            <input placeholder="Amount (ETH):" name="amount" type="number" 
            onChange={inputAmount} value={amount} 
            />
            <button type="submit" onClick={sendEthers} >Send Amount</button>
        
    </div>
  );

}

export default TransferEther;
