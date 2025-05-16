import React from 'react';
import { FiUser } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import './HeaderSearch.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img
          src="src/assets/icons/logoMC.png"
          alt="Logo"
          className="logoAIE"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
        
        {/* BARRE DE RECHERCHE RECTANGULAIRE */}
        <div className="search-bar">
          <input type="text" placeholder="Search for services..." />
          
          <button className="search-btn">
          <FaSearch id='ico'/>
          </button>
          
        </div>

        {/* NAVIGATION */}
        <nav className="nav-links">
          <a href="#Orders" className="nav-link">
            <span>Orders</span>
          </a>
          <a href="#Switch to Selling" className="nav-link">
            <span>Switch to Selling</span>
          </a>
          <div className="profile-icon">
            <FiUser />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
