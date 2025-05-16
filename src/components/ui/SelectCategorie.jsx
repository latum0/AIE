import React from 'react';
import './SelectCategorie.css';
import { FaFolderOpen } from 'react-icons/fa'; 

const SelectCategorie = () => {
  return (
    <div className="select-categorie">
      <label>
        <FaFolderOpen className="icon" /> Sélectionnez une catégorie
      </label>
      <select>
        <option>Développement Web</option>
        <option>Application Mobile</option>
        <option>Design UI/UX</option>
        <option>Réseau & Sécurité</option>
      </select>
    </div>
  );
};

export default SelectCategorie;
