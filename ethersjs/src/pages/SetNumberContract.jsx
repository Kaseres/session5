import { useState } from 'react';
import { ethers } from 'ethers';
import CallABI from '../utils/CallABI.json'

const { ethereum } = window;
function SetNumberContract() {
  const [number, setNumber] = useState(0);

  const onSetNumber = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract(
        '0x86B4254dE2f7c7E85D68C129fac688544Ce0D9a1', 
        CallABI, 
        signer 
    );

    let response = await contract.setNumber( number );
    await response.wait();
    
  };

  const inputNumber = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div className="App">
            <input placeholder="Number" name="number" type="number" 
            onChange={inputNumber} value={number} 
            />
            <button type="submit" onClick={onSetNumber} >Set Number</button>
        
    </div>
  );

}

export default SetNumberContract;
