"use client"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Star, Clock, CheckCircle, XCircle } from 'lucide-react';
import './ServiceCard.css';

const CarteService = ({ service, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [expandedPackage, setExpandedPackage] = useState('basic');
  
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };
  
  const handleConfirmDelete = () => {
    onDelete(service.id);
    setShowDeleteConfirm(false);
  };
  
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="star filled" size={18} strokeWidth={2.5} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} className="star half" size={18} strokeWidth={2.5} />);
      } else {
        stars.push(<Star key={i} className="star" size={18} strokeWidth={2.5} />);
      }
    }
    
    return stars;
  };
  
  const renderFeatures = (features) => {
    if (!features) return null;
    
    return (
      <ul className="features-list">
        {Object.entries(features).map(([key, enabled]) => (
          enabled && (
            <li key={key} className="feature-item">
              <CheckCircle className="feature-icon" size={16} strokeWidth={2.5} />
              <span>{formatFeatureName(key)}</span>
            </li>
          )
        ))}
      </ul>
    );
  };
  
  const formatFeatureName = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace('Revisions', 'Révisions')
      .replace('Delivery', 'Livraison')
      .replace('Source', 'Code source');
  };
  
  const getLowestPrice = () => {
    const prices = [
      service.packages.basic.price,
      service.packages.standard.price,
      service.packages.premium.price
    ].filter(price => typeof price === 'number' && !isNaN(price));
    
    return Math.min(...prices);
  };
  
  const { basic, standard, premium } = service.packages;
  
  return (
    <div className="service-card">
      <div className="service-image">
        <img src={service.image} alt={service.title} />
        <div className="service-price-badge">À partir de {getLowestPrice()}DA</div>
      </div>
      
      <div className="service-content">
        <h3 className="service-title">{service.title}</h3>
        
        <div className="service-rating">
          <div className="stars">{renderStars(service.rating || 0)}</div>
          <span className="rating-value">{service.rating || 0}</span>
        </div>
        
        <div className="package-tabs">
          <button 
            className={`package-tab ${expandedPackage === 'basic' ? 'active' : ''}`}
            onClick={() => setExpandedPackage('basic')}
          >
            Basique
          </button>
          <button 
            className={`package-tab ${expandedPackage === 'standard' ? 'active' : ''}`}
            onClick={() => setExpandedPackage('standard')}
          >
            Standard
          </button>
          <button 
            className={`package-tab ${expandedPackage === 'premium' ? 'active' : ''}`}
            onClick={() => setExpandedPackage('premium')}
          >
            Premium
          </button>
        </div>
        
        <div className="package-details">
          {expandedPackage === 'basic' && (
            <>
              <div className="package-price">{basic.price}DA</div>
              <p className="package-description">{basic.description}</p>
              {basic.deliveryTime && (
                <div className="delivery-time">
                  <Clock size={16} strokeWidth={2.5} />
                  <span>Livraison : {basic.deliveryTime}</span>
                </div>
              )}
              {renderFeatures(basic.features)}
            </>
          )}
          
          {expandedPackage === 'standard' && (
            <>
              <div className="package-price">{standard.price}DA</div>
              <p className="package-description">{standard.description}</p>
              {standard.deliveryTime && (
                <div className="delivery-time">
                  <Clock size={16} strokeWidth={2.5} />
                  <span>Livraison : {standard.deliveryTime}</span>
                </div>
              )}
              {renderFeatures(standard.features)}
            </>
          )}
          
          {expandedPackage === 'premium' && (
            <>
              <div className="package-price">{premium.price}DA</div>
              <p className="package-description">{premium.description}</p>
              {premium.deliveryTime && (
                <div className="delivery-time">
                  <Clock size={16} strokeWidth={2.5} />
                  <span>Livraison : {premium.deliveryTime}</span>
                </div>
              )}
              {renderFeatures(premium.features)}
            </>
          )}
        </div>
        
        <div className="service-actions">
          <Link to={`/freelancer/services/edit/${service.id}`} className="edit-button">
            <Edit size={16} strokeWidth={2.5} />
            <span>Modifier</span>
          </Link>
          <button className="delete-button" onClick={handleDeleteClick}>
            <Trash2 size={16} strokeWidth={2.5} />
            <span>Supprimer</span>
          </button>
        </div>
      </div>
      
      {showDeleteConfirm && (
        <div className="delete-confirmation">
          <h4>Supprimer le service ?</h4>
          <p>Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.</p>
          <div className="confirmation-actions">
            <button className="cancel-button" onClick={handleCancelDelete}>
              <XCircle size={16} strokeWidth={2.5} />
              <span>Annuler</span>
            </button>
            <button className="confirm-button" onClick={handleConfirmDelete}>
              <CheckCircle size={16} strokeWidth={2.5} />
              <span>Confirmer</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarteService;