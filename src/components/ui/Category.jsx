import React from 'react';
import './Category.css';

const Category = () => {
  const categories = [
    { name: 'Graphisme & Design', image: 'src/assets/icons/graphic.png' },
    { name: 'Animation de Dessin Animé', image: 'src/assets/icons/animation.png' },
    { name: 'Illustration', image: 'src/assets/icons/illustration.png' },
    { name: 'Flyers & Chèques-Cadeaux', image: 'src/assets/icons/vouchers.png' },
    { name: 'Conception de Logo', image: 'src/assets/icons/logoCat.png' },
    { name: 'Graphismes pour Réseaux Sociaux', image: 'src/assets/icons/social.png' },
    { name: 'Rédaction d\'Articles', image: 'src/assets/icons/article.png' },
    { name: 'Montage Vidéo', image: 'src/assets/icons/videoEditing.png' }
  ];

  return (
    <div className="category-container">
      <h2 className="section-title">
        Choisissez une <span className="highlight">Catégorie</span> Différente
      </h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img 
              src={category.image} 
              alt={category.name} 
              className="category-image"
            />
            <div className="category-overlay">
              <h3 className="category-name">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <button className="more-btn">Plus de catégories</button>
    </div>
  );
};

export default Category;