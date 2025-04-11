import React from 'react';
import './Hero.css';
import { FiSearch } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Are you looking for Freelancers?</h1>
          <p className="hero-subtitle">
            Hire Great Freelancers, Fast. Spacelance helps you hire elite freelancers at a moment's notice
          </p>
          <div className="hero-actions">
            <button className="hire-btn">Hire a freelancer</button>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search freelance work" 
                className="search-input"
              />
              <FiSearch className="search-icon" />
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <img 
            src="src/assets/icons/Hero.png" 
            alt="Freelancers illustration" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;