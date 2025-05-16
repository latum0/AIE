import React from 'react';
import './Hero.css';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Vous cherchez des freelances ?</h1>
          <p className="hero-subtitle">
            Embauchez des freelances de qualité, rapidement. Spacelance vous aide à engager des freelances d’élite en un rien de temps.
          </p>
          <div className="hero-actions">
            <Link to="/formulaire-projet">
              <button className="hire-btn">Engager un freelance</button>
            </Link>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Rechercher un travail freelance" 
                className="search-input"
              />
              <FiSearch className="search-icon" />
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <img 
            src="src/assets/icons/Hero.png" 
            alt="Illustration de freelances" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
