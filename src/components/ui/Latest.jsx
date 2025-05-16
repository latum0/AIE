import React from 'react';
import './Latest.css';

const JobCard = ({ icon, title, description, bid }) => (
  <div className="unique-job-card">
    <img src={icon} alt="Icône du travail" className="unique-job-icon" />
    <h3 className="unique-job-title">{title}</h3>
    <p className="unique-job-description">{description}</p>
    <div className="unique-bid-info">
      <span className="unique-bid-label">Offre la plus élevée</span>
      <span className="unique-bid-amount">${bid}</span>
      <a href="#" className="unique-apply-btn">Postuler maintenant</a>
    </div>
  </div>
);

const Latest = () => {
  return (
    <div className="unique-latest-container">
      <div className="unique-header-section">
        <div className="unique-header-text">
          <p className="unique-subtitle">Les dernières missions freelance !</p>
          <h1 className="unique-main-title">
            Travaux récemment <span className="unique-highlight">publiés</span>
          </h1>
        </div>
      </div>
      <div className="unique-card-container">
        <JobCard 
          icon="src/assets/icons/logoDesign.png"
          title="Conception de logo"
          description="Nous avons besoin d'un logo professionnel avec une inscription en dessous pour notre entreprise de bijoux"
          bid="500"
        />
        <JobCard 
          icon="src/assets/icons/graphicDesign.png"
          title="Design graphique"
          description="Nous recherchons un designer graphique avec des compétences UI/UX pour notre entreprise de meubles"
          bid="500"
        />
        <JobCard 
          icon="src/assets/icons/SEO.png"
          title="Besoin d'un expert SEO"
          description="Nous avons besoin d’un expert SEO pour faire évoluer notre entreprise à un niveau supérieur"
          bid="300"
        />
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Latest;
=======
export default Latest;  
>>>>>>> 76d3590a17ed84f65109d929dd623568067305b7
