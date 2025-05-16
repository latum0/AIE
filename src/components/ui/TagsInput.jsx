import React from 'react';
import './TagsInput.css';

const TagsInput = () => {
  return (
    <div className="tags-container">
      <div className="tags-section">
        <label>Rechercher des tags</label>
        <p>Ajoutez des mots-clés pertinents pour les services que vous proposez. Utilisez les 5 tags pour être facilement trouvé.</p>
      </div>
      <div className="tags-section">
        <label>Mots-clés positifs</label>
        <p>Entrez les termes de recherche que vos acheteurs pourraient utiliser pour trouver votre service.</p>
        <input type="text" placeholder="Entrez des mots-clés..." />
        <div className="char-note">Maximum 5 tags. Utilisez uniquement des lettres et des chiffres.</div>
      </div>
      <div className="note-warning">
        <strong>⚠️ Veuillez noter :</strong> Certaines catégories exigent que les vendeurs vérifient leurs compétences.
      </div>
    </div>
  );
};

export default TagsInput;
