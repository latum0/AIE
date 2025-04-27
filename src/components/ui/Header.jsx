import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src="src/assets/icons/logoMC.png" alt="" className="logoAIE"  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}/>
        <nav className="nav-links">
          <a href="#become-seller">Devenir vendeur</a>
          <a href="#signin">Se connecter</a>
          <button className="join-btn">Rejoindre</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;