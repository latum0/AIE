import React from 'react';
import './Freelancers.css';
import freelancer from '../../assets/icons/wFreelancer.png';

const FreelancerSection = () => {
  return (
    <div className="unique-freelancer-container">
      <div className="unique-image-section">
        <img 
          src={freelancer}
          alt="Freelancer"
          className="unique-freelancer-image"
        />
        <div className="unique-stats-card">
          <div className="unique-stat-item">
            <h3>500+</h3>
            <p>freelancers</p>
          </div>
          <div className="unique-stat-item">
            <h3>300+</h3>
            <p>freelance work posted</p>
          </div>
        </div>
      </div>
      <div className="unique-content-section">
        <h2 className="unique-title">
          Find The Best <span className="unique-highlight">Freelancers</span> Here
        </h2>
        <p className="unique-description">
        Scale your projects with confidence using our global network of pre-vetted freelancers. From full-stack developers to creative designers and marketing strategists, access top-tier talent ready to deliver high-quality results. Our platform offers flexible engagement models, transparent communication tools, and a 98% client satisfaction rate - ensuring you meet deadlines without compromising on quality. Whether you need a single specialist or a complete remote team, we make building your dream team effortless.        </p>
      </div>
    </div>
  );
};

export default FreelancerSection;