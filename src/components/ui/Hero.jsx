import React from 'react';
import './Hero.css';
import { FiSearch } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Vous cherchez des freelances ?</h1>
          <p className="hero-subtitle">
            Engagez les meilleurs talents en un clic. Spacelance vous connecte aux freelances experts en temps réel
          </p>
          <div className="hero-actions">
            <button className="hire-btn">Engager un freelance</button>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Rechercher une mission" 
                className="search-input"
              />
              <FiSearch className="search-icon" />
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <img 
            src="src/assets/icons/Hero.png" 
            alt="Illustration freelances" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;