import { useState } from 'react';
import Web3 from "web3";
import CallABI from '../utils/CallABI.json'

const { ethereum } = window;
function SetNumberContract() {

  const [number, setNumberAmount] = useState(0);

  const onSetNumber = async () => {
    const web3 = new Web3(ethereum);

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

export default SetNumberContract;
