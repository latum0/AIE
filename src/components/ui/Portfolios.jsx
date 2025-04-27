import React from 'react';
import './Portfolios.css';

const PortfolioCard = ({ image, name, role }) => (
  <div className="unique-portfolio-card">
    <img src={image} alt={`Portfolio ${name}`} className="unique-profile-image"/>
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
        <p className="unique-subtitle">Logos, sites web, couvertures de livres et plus !</p>
        <h2 className="unique-main-title">
          Découvrez les meilleurs <span className="unique-highlight">portfolios</span>
        </h2>
      </div>
      <div className="unique-card-container">
        <PortfolioCard 
          image="src/assets/icons/fl1.png"
          name="Freelance 1"
          role="Designer UI/UX"
        />
        <PortfolioCard 
          image="src/assets/icons/fl2.png"
          name="Freelance 2"
          role="Graphiste"
        />
        <PortfolioCard 
          image="src/assets/icons/fl2.png"
          name="Freelance 3"
          role="Graphiste"
        />
      </div>
    </div>
  );
};

export default Portfolios;