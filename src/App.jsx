import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Gig from './pages/Gig';
import AccountSettings from './pages/AccountSettings';
import OrderExtras from './pages/OrderExtras';
import ConfirmP from './pages/ConfirmP';
//import Submit from './pages/Submit';
import Chat from './pages/Chat';
import FreelancerProfile from './pages/FreelancerProfile';
import ConversationPage from './pages/ConversationPage';
import ReviewsRate from './components/ui/ReviewsRate';
import ReviewsComment from './components/ui/ReviewsComment';

import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Navbar1 from './components/ui/Navbar1';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar1 />
      {/* All pages/routers are now under one BrowserRouter context */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gig/:id" element={<Gig />} />

        <Route path="/account" element={<AccountSettings />} />
        <Route path="/orderExtras" element={<OrderExtras />} />
        <Route path="/confirmP" element={<ConfirmP />} />
        {/*<Route path="/submit" element={<Submit />} />*/}
        <Route path="/chat" element={<Chat />} />
        <Route path="/freelancer/:id" element={<FreelancerProfile />} />
        <Route path="/conversation" element={<ConversationPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
