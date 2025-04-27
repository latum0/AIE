import React from 'react';
import './Footer.css';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="content-wrapper">
        <div className="logo-section">
          <img src="src/assets/icons/logoMC.png" alt="Logo Skill Market" className="logoAIE" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}/>
          <p className="tagline">
            Plateforme freelance puissante permettant de connecter les utilisateurs (freelances et clients)
          </p>
          <div className="social-icons">
            <a href="#" className="icon-link"><FaInstagram /></a>
            <a href="#" className="icon-link"><FaTwitter /></a>
            <a href="#" className="icon-link"><FaFacebook /></a>
          </div>
        </div>

        <div className="links-section">
          <div className="link-column">
            <h4>Pour les clients</h4>
            <ul>
              <li><a href="#">Trouver des freelances</a></li>
              <li><a href="#">Publier un projet</a></li>
              <li><a href="#">Politique de remboursement</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
            </ul>
          </div>

          <div className="link-column">
            <h4>Pour les freelances</h4>
            <ul>
              <li><a href="#">Trouver des missions</a></li>
              <li><a href="#">Créer un compte</a></li>
            </ul>
          </div>

          <div className="contact-column">
            <h4>Nous contacter</h4>
            <div className="contact-item">
              <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
              <span className="text">Algérie</span>
            </div>
            <div className="contact-item">
              <span className="icon"><i className="fas fa-phone"></i></span>
              <span className="text">+21300000000</span>    
            </div>
            <div className="contact-item">
              <span className="icon"><i className="fas fa-envelope"></i></span>
              <span className="text">skillMarket@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        <p>2025 SkillMarket. Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;