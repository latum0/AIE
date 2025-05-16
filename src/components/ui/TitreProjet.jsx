import React from 'react';
import './TitreProjet.css';
import { FaRegEdit } from 'react-icons/fa'; 

const TitreProjet = () => {
  return (
    <div className="titre-projet">
      <label><FaRegEdit className="icon" /> Donne un titre à ton projet</label>
      <input
        type="text"
        placeholder="Exemple : Créer un site WordPress pour mon entreprise"
        maxLength={70}
      />
    </div>
  );
};

export default TitreProjet;
