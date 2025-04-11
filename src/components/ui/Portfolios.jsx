import React from 'react';
import './Portfolios.css';

const PortfolioCard = ({ image, name, role }) => (
  <div className="unique-portfolio-card">
    <img src={image} alt={`${name}'s Portfolio`} className="unique-profile-image"/>
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
        <p className="unique-subtitle">Logos, websites, book covers & more!</p>
        <h2 className="unique-main-title">
          Checkout The Best <span className="unique-highlight">Portfolios</span> Here
        </h2>
      </div>
      <div className="unique-card-container">
        <PortfolioCard 
          image="src/assets/icons/fl1.png"
          name="Freelancer 1"
          role="UI/UX Designer"
        />
        <PortfolioCard 
          image="src/assets/icons/fl2.png"
          name="Freelancer 2"
          role="Graphic Designer"
        />
        <PortfolioCard 
          image="src/assets/icons/fl2.png"
          name="Freelancer 3"
          role="Graphic Designer"
        />
      </div>
    </div>
  );
};

export default Portfolios;