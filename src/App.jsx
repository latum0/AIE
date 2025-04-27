import React from 'react';
import Home from './pages/Home';
import './App.css';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Gig from './pages/Gig';

function App() {
  return (
    <div >
     

     <Header/>
      {/*<Gig/>*/}
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;