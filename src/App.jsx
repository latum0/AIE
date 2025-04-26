import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ Ajout de Routes et Route
import { Navigate } from 'react-router-dom';

import Home from './pages/Home';
import './App.css';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Navbar1 from './components/ui/Navbar1';
import Gig from './pages/Gig';
import AccountSettings from './pages/AccountSettings';
import OrderExtras from './pages/OrderExtras';
import ConfirmP from './pages/ConfirmP';
import Submit from './pages/submit';
function App() {
  return (
    <BrowserRouter>
      <div>
        {/*<Header />*/}
        {/*<Navbar1 />*/}

        <Routes>
          <Route path="/" element={<Navigate to="/orderExtras" />} />
          {/*<Route path="/" element={<Home />} />*/}
          {/*<Route path="/gig" element={<Gig />} />*/}
          {/*<Route path="/account" element={<AccountSettings />} />*/}
          <Route path="/orderExtras" element={<OrderExtras />} />
          <Route path="/confirmP" element={<ConfirmP />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
