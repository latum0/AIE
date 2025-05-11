import React from 'react';
import './DescriptionProjet.css';
import { FaRegCommentDots } from 'react-icons/fa'; 

const DescriptionProjet = () => {
  return (
    <div className="description-projet">
      <label>
        <FaRegCommentDots className="icon" /> Detail your project
      </label>
      <textarea rows="5" placeholder="Describe your project here, its objectives, constraints, etc."></textarea>
    </div>
  );
};

export default DescriptionProjet;
