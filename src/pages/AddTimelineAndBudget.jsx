import React from 'react';
import './AddTimelineAndBudget.css';
import { FaClock, FaEuroSign } from 'react-icons/fa';
import EtapesNavbar from '../components/ui/EtapesNavbar';

const AddTimelineAndBudget = () => {
  return (
    <div>
      <EtapesNavbar currentStep="Ajoutez un délai et un budget" />
      <div className="timeline-budget-page">
        
        <form className="timeline-form">
          <label>
            <FaClock className="icon" /> Durée du projet :
            <input type="text" placeholder="ex : 2 semaines" />
          </label>
          <label>
            <FaEuroSign className="icon" /> Budget :
            <input type="text" placeholder="ex : 500 €" />
          </label>
          <div className="submit-container">
  <button type="submit" className="btn-submit">Soumettre</button>
</div>
        </form>
      </div>
    </div>
  );
};

export default AddTimelineAndBudget;
