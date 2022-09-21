import { useState } from 'react';
import Web3 from "web3";
import CallABI from '../utils/CallABI.json'

function BalanceContract() {

  const [number, setNumberAmount] = useState(0);

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

  const onSetNumber = async () => {
    const currentProvider = detectCurrentProvider();
    await currentProvider.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(currentProvider);

    const contract = new web3.eth.Contract(
      CallABI, 
      '0x86B4254dE2f7c7E85D68C129fac688544Ce0D9a1'
    )
    
    const accounts = await web3.eth.getAccounts();
    
    await contract.methods.setNumber(
      number
    ).send( {from: accounts[0] }); 
  };

  const inputNumber = (e) => {
    setNumberAmount(e.target.value);
  };

  return (
    <div className="App">
            <input placeholder="Number" name="number" type="number" onChange={inputNumber} value={number} />
            <button type="submit" onClick={onSetNumber} >Set Number</button>
        
    </div>
  );

}

export default BalanceContract;
