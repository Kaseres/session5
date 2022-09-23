import { useState } from 'react';
import { ethers } from 'ethers';
import CallABI from '../utils/CallABI.json'

const { ethereum } = window;
function TransferEthers() {
  const [amount, setAmount] = useState(0);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [writeBlockSuccess, setWriteBlockSuccess] = useState(false);

  const sendEthers = async () => {
    setSendSuccess(false);
    setWriteBlockSuccess(false);
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract(
        '0x86B4254dE2f7c7E85D68C129fac688544Ce0D9a1', 
        CallABI, 
        signer 
    );
    
    const response = await contract.transferEther( 
      { value: ethers.utils.parseEther(amount) } 
    );
    setSendSuccess(true);
    
    await response.wait();
    setWriteBlockSuccess(true);
  };

  const inputAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="App">
      <input placeholder="Amount (ETH):" name="amount" type="number" onChange={inputAmount} value={amount} />
      <button type="submit" onClick={sendEthers} >Send Amount</button>
      {sendSuccess ? <div>Send value {amount} to contract</div> : null }
      {writeBlockSuccess ? <div>Update value success</div> : null }
    </div>
  );

}

export default TransferEthers;
