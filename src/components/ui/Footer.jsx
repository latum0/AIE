import React from 'react';
import './Footer.css';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="content-wrapper">
        <div className="logo-section">
          <img src="src/assets/icons/logoMC.png" alt="Skill Market Logo" className="logoAIE" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}/>
          <p className="tagline">
            Powerful Freelance Marketplace System with ability to change the Users (Freelancers & Clients)
          </p>
          <div className="social-icons">
            <a href="#" className="icon-link"><FaInstagram /></a>
            <a href="#" className="icon-link"><FaTwitter /></a>
            <a href="#" className="icon-link"><FaFacebook /></a>
          </div>
        </div>

        <div className="links-section">
          <div className="link-column">
            <h4>For Clients</h4>
            <ul>
              <li><a href="#">Find Freelancers</a></li>
              <li><a href="#">Post Project</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="link-column">
            <h4>For Freelancers</h4>
            <ul>
              <li><a href="#">Find Work</a></li>
              <li><a href="#">Create Account</a></li>
            </ul>
          </div>

          <div className="contact-column">
            <h4>Call Us</h4>
            <div className="contact-item">
              <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
              <span className="text">Algeria</span>
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
        <p>2025 skillMarket. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;