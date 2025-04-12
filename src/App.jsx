import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FormulaireProjet from './pages/FormulaireProjet';
import AddTimelineAndBudget from './pages/AddTimelineAndBudget';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/FormulaireProjet" />} />
        <Route path="/FormulaireProjet" element={<FormulaireProjet />} />
        <Route path="/AddTimelineAndBudget" element={<AddTimelineAndBudget />} />
      </Routes>
    </Router>
  );
}

export default App;
