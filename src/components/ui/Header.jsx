import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/home">
          <img 
            src="/src/assets/icons/logoMC.png" 
            alt="Logo" 
            className="logo"
          />
        </Link>
        <nav className="nav-links">
          {/* Corrigé : redirige vers /freelancer (Tableau de bord en index) */}
          <Link to="/freelancer" className="seller-link">
            Devenir freelancer
          </Link>
          <Link to="/login" className="signin-link">
            Se connecter
          </Link>
          <Link to="/signup" className="join-btn">
            S'inscrire
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
