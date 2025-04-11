import React from 'react';
import './Latest.css';

const JobCard = ({ icon, title, description, bid }) => (
  <div className="unique-job-card">
    <img src={icon} alt="Job Icon" className="unique-job-icon"/>
    <h3 className="unique-job-title">{title}</h3>
    <p className="unique-job-description">{description}</p>
    <div className="unique-bid-info">
      <span className="unique-bid-label">Highest bid</span>
      <span className="unique-bid-amount">${bid}</span>
      <a href="#" className="unique-apply-btn">Apply now</a>
    </div>
  </div>
);

const Latest = () => {
  return (
    <div className="unique-latest-container">
      <div className="unique-header-section">
        <div className="unique-header-text">
          <p className="unique-subtitle">The latest freelance work!</p>
          <h1 className="unique-main-title">
            Recently Posted <span className="unique-highlight">Works</span>
          </h1>
        </div>
      </div>
      <div className="unique-card-container">
        <JobCard 
          icon="src/assets/icons/logoDesign.png"
          title="Logo Design"
          description="Need a professional logo with writing underneath for our jewellery company"
          bid="500"
        />
        <JobCard 
          icon="src/assets/icons/graphicDesign.png"
          title="Graphic Design"
          description="We need a graphic designer with UI/UX skills for our Furniture company"
          bid="500"
        />
        <JobCard 
          icon="src/assets/icons/SEO.png"
          title="Need a SEO"
          description="Need a SEO for our company who will let our company to a higher level"
          bid="300"
        />
      </div>
    </div>
  );
};

export default Latest;