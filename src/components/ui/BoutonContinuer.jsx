import React from 'react';
import './BoutonContinuer.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'; 

const BoutonContinuer = () => {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/add-timeline');
    };
  return (
    <div className="bouton-continuer">
      <button onClick={handleClick}>
        Continue <FaArrowRight className="icon" />
      </button>
    </div>
  );
};

export default BoutonContinuer;
