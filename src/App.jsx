<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountSettings from './pages/AccountSettings';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/%20accountSettings" element={<Navigate to="/account-settings" replace />} />
            </Routes>
        </Router>
    );
=======
import React from 'react';
import Home from './pages/Home';
import './App.css';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Gig from './pages/Gig';

function App() {
  return (
    <div >
      {/*<Gig/>*/}

     <Header/>
      
      <Home/>
      <Footer/>
    </div>
  );
>>>>>>> 26b7e18aa3b0c75a98195607cc7e2c92aa347687
}

export default App;