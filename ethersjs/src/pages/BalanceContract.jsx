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
    
    const getContractBalance = await contract.getBalance(); 
    
    const convertContractBalance = ethers.utils.formatUnits(getContractBalance);
    
    setBalance(convertContractBalance)
    
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
