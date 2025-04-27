import React from 'react';
import './Latest.css';

const JobCard = ({ icon, title, description, bid }) => (
  <div className="unique-job-card">
    <img src={icon} alt="Icône mission" className="unique-job-icon"/>
    <h3 className="unique-job-title">{title}</h3>
    <p className="unique-job-description">{description}</p>
    <div className="unique-bid-info">
      <span className="unique-bid-label">Meilleure offre</span>
      <span className="unique-bid-amount">{bid}DA</span>
      <a href="#" className="unique-apply-btn">Postuler</a>
    </div>
  </div>
);

const Latest = () => {
  return (
    <div className="unique-latest-container">
      <div className="unique-header-section">
        <div className="unique-header-text">
          <p className="unique-subtitle">Dernières missions disponibles !</p>
          <h1 className="unique-main-title">
            Travaux récemment <span className="unique-highlight">publiés</span>
          </h1>
        </div>
      </div>
      <div className="unique-card-container">
        <JobCard 
          icon="src/assets/icons/logoDesign.png"
          title="Conception de logo"
          description="Besoin d'un logo professionnel avec texte pour notre marque de joaillerie"
          bid="50000"
        />
        <JobCard 
          icon="src/assets/icons/graphicDesign.png"
          title="Design graphique"
          description="Recherche un designer UI/UX pour notre entreprise de mobilier"
          bid="5000"
        />
        <JobCard 
          icon="src/assets/icons/SEO.png"
          title="Expert SEO"
          description="Recherche spécialiste SEO pour améliorer notre visibilité en ligne"
          bid="3000"
        />
      </div>
    </div>
  );
};

export default Latest;  