import React from 'react';
import './SellerAbout.css';

const SellerAbout = ({ data }) => {
  return (
    <div className="seller-about">
      <h3 className="title">À propos du vendeur</h3>
      
      <div className="profile-section">
        <img 
          src={data.profilePicture} 
          alt={`Profil ${data.username}`} 
          className="profile-picture"
        />
        
        <div className="details-container">
          <div className="top-details">
            <div className="username">{data.username}</div>
            <div className="studio-name">{data.studioName}</div>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
              <span className="rating-number">{data.rating}</span>
              <span className="feedback-count">({data.feedbackCount})</span>
            </div>
          </div>
          
          <button className="contact-button">Me contacter</button>
        </div>
      </div>

      <div className="info-card">
        <div className="info-grid">
          <div className="info-row">
            <div className="label">De</div>
            <div className="value">{data.location}</div>
          </div>
          <div className="info-row">
            <div className="label">Membre depuis</div>
            <div className="value">{data.memberSince}</div>
          </div>
          <div className="info-row">
            <div className="label">Réponse moyenne</div>
            <div className="value">{data.responseTime}</div>
          </div>
          <div className="info-row">
            <div className="label">Dernière livraison</div>
            <div className="value">{data.lastDelivery}</div>
          </div>
          <div className="info-row">
            <div className="label">Langues</div>
            <div className="value">{data.languages.join(', ')}</div>
          </div>
        </div>

        <div className="description">
          {data.description.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerAbout;