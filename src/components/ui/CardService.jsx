
import React from "react";
import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock, FaSyncAlt } from 'react-icons/fa';
import './CardService.css';

const iconMap = {
  FaCheckCircle: <FaCheckCircle />,
  FaTimesCircle: <FaTimesCircle />,
  FaClock: <FaClock />,
  FaSyncAlt: <FaSyncAlt />,
};

const CardService = ({ packages }) => {
  const [activePackage, setActivePackage] = useState('basic');
  const currentPackage = packages.find(
    (pkg) => pkg.name.toLowerCase() === activePackage
  );

  return (
    <div className="card-container">
      <div className="tabs">
        {packages.map((pkg) => (
          <button
            key={pkg.name}
            className={`tab-button ${activePackage === pkg.name.toLowerCase() ? 'active' : ''}`}
            onClick={() => setActivePackage(pkg.name.toLowerCase())}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      <div className="card-content">
        <div className="header">
          <h5>{currentPackage.promoName}</h5>
          <span className="price">{currentPackage.price}</span>
        </div>

        <p className="description">{currentPackage.description}</p>

        <div className="details">
          <div className="delivery">
            {iconMap['FaClock']}
            <span>{currentPackage.deliveryDays} Jours de livraison</span>
          </div>
          <div className="revisions">
            {iconMap['FaSyncAlt']}
            <span>{currentPackage.revisions} Révision</span>
          </div>
        </div>

        <ul className="features">
          {currentPackage.features.map((feature, index) => (
            <li key={index} className={`feature ${feature.included ? 'included' : 'excluded'}`}>
              <span className="icon">
                {iconMap[feature.icon] || iconMap['FaTimesCircle']}
              </span>
              {feature.text}
            </li>
          ))}
        </ul>

        <button className="continue-btn">Continuer →</button>
      </div>
    </div>
  );
};

export default CardService;