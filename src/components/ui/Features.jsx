import React from 'react';
import './Features.css';
import lock from '../../assets/icons/lock.png';
import searchWork from '../../assets/icons/searchWork.png';
import save from '../../assets/icons/save.png';

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'Créer un compte',
      description: 'Vous devez d\'abord créer un compte ici',
      icon: lock
    },
    {
      id: 2,
      title: 'Rechercher du travail',
      description: 'Trouvez les meilleures missions freelance ici',
      icon: searchWork
    },
    {
      id: 3,
      title: 'Enregistrer et postuler',
      description: 'Postulez ou enregistrez pour commencer à travailler',
      icon: save
    }
  ];

  return (
    <section className="features-section">
      <div className="feature-card">
        {features.map((feature) => (
          <div key={feature.id} className="feature-item">
            <img 
              src={feature.icon} 
              alt={feature.title} 
              className="feature-icon"
            />
            <div className="feature-content">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;