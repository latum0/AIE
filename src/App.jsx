import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FormulaireProjet from './pages/FormulaireProjet';
import AddTimelineAndBudget from './pages/AddTimelineAndBudget';
import Home from './pages/Home';
import './App.css';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
// import Gig from './pages/Gig'; // décommenter si besoin

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/FormulaireProjet" />} />
        <Route path="/FormulaireProjet" element={<FormulaireProjet />} />
        <Route path="/AddTimelineAndBudget" element={<AddTimelineAndBudget />} />
        {/* Tu peux aussi avoir une page d'accueil directe ici si tu veux */}
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
