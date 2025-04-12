import React from 'react';
import './DescriptionProjet.css';
import { FaRegCommentDots } from 'react-icons/fa'; 

const DescriptionProjet = () => {
  return (
    <div className="description-projet">
      <label>
        <FaRegCommentDots className="icon" /> Détaillez votre projet
      </label>
      <textarea rows="5" placeholder="Décrivez ici votre projet, ses objectifs, contraintes, etc."></textarea>
    </div>
  );
};

export default DescriptionProjet;
