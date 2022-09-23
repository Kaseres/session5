import { useState } from 'react';
import { ethers } from 'ethers';
import CallABI from '../utils/CallABI.json'

const { ethereum } = window;
function SetNumberContract() {
  const [number, setNumber] = useState(0);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [writeBlockSuccess, setWriteBlockSuccess] = useState(false);

  const onSetNumber = async () => {
    setSendSuccess(false);
    setWriteBlockSuccess(false);
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract(
        '0x86B4254dE2f7c7E85D68C129fac688544Ce0D9a1', 
        CallABI, 
        signer 
    );

    const response = await contract.setNumber( number );
    setSendSuccess(true);
    
    await response.wait();
    setWriteBlockSuccess(true);
  };

  const inputNumber = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div className="App">
      <input placeholder="Number" name="number" type="number" onChange={inputNumber} value={number} />
      <button type="submit" onClick={onSetNumber} >Set Number</button>
      {sendSuccess ? <div>Update value to : {number}</div> : null }
      {writeBlockSuccess ? <div>Update value success</div> : null }
    </div>
  );
}

export default SetNumberContract;
