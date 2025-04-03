import React from 'react';
import './Portfolios.css';

const PortfolioCard = ({ image, name, role }) => (
  <div className="portfolio-card">
    <img src={image} alt={`${name}'s Portfolio`} className="profile-image"/>
    <h3 className="freelancer-name">{name}</h3>
    <p className="role">{role}</p>
    <a href="#" className="view-portfolio">
      <span>→</span>
    </a>
  </div>
);

const Portfolios = () => {
  return (
    <div className="portfolios-container">
      <div className="header-section">
        <p className="subtitle">Logos, websites, book covers & more!</p>
        <h2 className="main-title">
          Checkout The Best <span className="highlight">Portfolios</span> Here
        </h2>
      </div>
      <div className="card-container">
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