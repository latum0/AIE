import React from 'react';
import './Freelancers.css';
import freelancer from '../../assets/icons/wFreelancer.png';

const FreelancerSection = () => {
  return (
    <div className="unique-freelancer-container">
      <div className="unique-image-section">
        <img 
          src={freelancer}
          alt="Freelance"
          className="unique-freelancer-image"
        />
        <div className="unique-stats-card">
          <div className="unique-stat-item">
            <h3>500+</h3>
            <p>freelances</p>
          </div>
          <div className="unique-stat-item">
            <h3>300+</h3>
            <p>missions publiées</p>
          </div>
        </div>
      </div>
      <div className="unique-content-section">
        <h2 className="unique-title">
          Trouvez les meilleurs <span className="unique-highlight">Freelances</span> ici
        </h2>
        <p className="unique-description">
        Gérez vos projets en toute confiance grâce à notre réseau mondial de freelances vérifiés. Développeurs full-stack, designers créatifs ou experts en marketing - accédez à des talents d'élite prêts à livrer des résultats de qualité. Notre plateforme offre des modèles d'engagement flexibles, des outils de communication transparents et un taux de satisfaction client de 98%. Que vous ayez besoin d'un spécialiste ou d'une équipe complète, nous simplifions la création de votre dream team.        </p>
      </div>
    </div>
  );
};

export default FreelancerSection;