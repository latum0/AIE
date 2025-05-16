import React from 'react';
import './Portfolios.css';

const PortfolioCard = ({ image, name, role }) => (
  <div className="unique-portfolio-card">
    <img src={image} alt={`Portfolio de ${name}`} className="unique-profile-image" />
    <h3 className="unique-freelancer-name">{name}</h3>
    <p className="unique-role">{role}</p>
    <a href="#" className="unique-view-portfolio">
      <span>→</span>
    </a>
  </div>
);

const Portfolios = () => {
  return (
    <div className="unique-portfolios-container">
      <div className="unique-header-section">
        <p className="unique-subtitle">Logos, sites web, couvertures de livres & plus encore !</p>
        <h2 className="unique-main-title">
          Découvrez les meilleurs <span className="unique-highlight">portfolios</span> ici
        </h2>
      </div>
      <div className="unique-card-container">
        <PortfolioCard 
          image="src/assets/icons/fl1.png"
          name="Freelancer 1"
          role="Designer UI/UX"
        />
        <PortfolioCard 
          image="src/assets/icons/fl2.png"
          name="Freelancer 2"
          role="Designer graphique"
        />
        <PortfolioCard 
          image="src/assets/icons/fl2.png"
          name="Freelancer 3"
          role="Designer graphique"
        />
      </div>
    </div>
  );
};

export default Portfolios;
