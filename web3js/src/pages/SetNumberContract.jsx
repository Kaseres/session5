import { useState } from 'react';
import Web3 from "web3";
import CallABI from '../utils/CallABI.json'

const { ethereum } = window;
function SetNumberContract() {
  const [number, setNumber] = useState(0);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [writeBlockSuccess, setWriteBlockSuccess] = useState(false);

  const onSetNumber = async () => {
    setSendSuccess(false);
    setWriteBlockSuccess(false);
    const web3 = new Web3(ethereum);

    const contract = new web3.eth.Contract(
      CallABI, 
      '0x86B4254dE2f7c7E85D68C129fac688544Ce0D9a1'
    );
    
    const accounts = await web3.eth.getAccounts();
    await contract.methods.setNumber(
        number
      ).send({
        from: accounts[0]
      }).on('transactionHash', function(hash) { 
        console.log('hash',hash);
        setSendSuccess(true);
      }).on('receipt', function(receipt) {
        console.log('receipt', receipt)
        setWriteBlockSuccess(true);
      });
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
