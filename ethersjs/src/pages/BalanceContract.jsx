import { useState } from 'react';
import { ethers } from 'ethers';
import CallABI from '../utils/CallABI.json'

const { ethereum } = window;
function BalanceContract() {
  const [balance, setBalance] = useState(0);

  const getBalanceContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract(
      '0x86B4254dE2f7c7E85D68C129fac688544Ce0D9a1', 
      CallABI, 
      signer 
    );
    
    const contractBalance = await contract.getBalance(); 
    const convertBalance = ethers.utils.formatUnits(contractBalance);
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
