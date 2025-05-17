import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock, FaSyncAlt } from "react-icons/fa";
import "./CardService.css";

const iconMap = {
  FaCheckCircle: <FaCheckCircle />,
  FaTimesCircle: <FaTimesCircle />,
  FaClock: <FaClock />,
  FaSyncAlt: <FaSyncAlt />,
};

const CardService = ({ packages }) => {
  const [activePackage, setActivePackage] = useState("basic");

  // If packages is empty or not provided, render a fallback message.
  if (!packages || packages.length === 0) {
    return <div>No packages available</div>;
  }

  // Look for the active package; if none found, default to the first package.
  const currentPackage =
    packages.find((pkg) => pkg.name.toLowerCase() === activePackage) ||
    packages[0];

  return (
    <div className="card-container">
      <div className="tabs">
        {packages.map((pkg) => (
          <button
            key={pkg.name}
            className={`tab-button ${
              activePackage === pkg.name.toLowerCase() ? "active" : ""
            }`}
            onClick={() => setActivePackage(pkg.name.toLowerCase())}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      <div className="card-content">
        <div className="header">
          <h5>{currentPackage.promoName || "No Promo Name"}</h5>
          <span className="price">{currentPackage.price || ""}</span>
        </div>

        <p className="description">{currentPackage.description || ""}</p>

        <div className="details">
          <div className="delivery">
            {iconMap["FaClock"]}
            <span>{currentPackage.deliveryDays || 0} Jours de livraison</span>
          </div>
          <div className="revisions">
            {iconMap["FaSyncAlt"]}
            <span>{currentPackage.revisions || 0} Révision</span>
          </div>
        </div>

        <ul className="features">
          {(currentPackage.features || []).map((feature, index) => (
            <li
              key={index}
              className={`feature ${feature.included ? "included" : "excluded"}`}
            >
              <span className="icon">
                {iconMap[feature.icon] || iconMap["FaTimesCircle"]}
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
