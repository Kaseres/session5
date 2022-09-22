
import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import WalletConnect from './pages/WalletConnect';
import BalanceWallet from './pages/BalanceWallet';
import GetAddress from './pages/GetAddress';
import BalanceContract from './pages/BalanceContract';
import TransferEther from './pages/TransferEther';
import SetNumberContract from './pages/SetNumberContract';

const App = () => {
  return (

    <Fragment>
      <BrowserRouter>
        <Routes>
            <Route index element={<WalletConnect />} />
            <Route path="/balance" element={<BalanceWallet />} />
            <Route path="/address" element={<GetAddress />} />
            <Route path="/balance-contract" element={<BalanceContract />} />
            <Route path="/transfer-ether" element={<TransferEther />} />
            <Route path="/setnumber" element={<SetNumberContract />} />
        </Routes>
      </BrowserRouter>
    </Fragment>

  );
};

export default App;