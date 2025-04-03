import React from 'react';
import './Latest.css';

const JobCard = ({ icon, title, description, bid }) => (
  <div className="job-card">
    <img src={icon} alt="Job Icon" className="job-icon"/>
    <h3 className="job-title">{title}</h3>
    <p className="job-description">{description}</p>
    <div className="bid-info">
      <span className="bid-label">Highest bid</span>
      <span className="bid-amount">${bid}</span>
      <a href="#" className="apply-btn">Apply now</a>
    </div>
  </div>
);

const Latest = () => {
  return (
    <div className="latest-container">
      <div className="header-section">
        <div className="header-text">
          <p className="subtitle">The latest freelance work!</p>
          <h1 className="main-title">
            Recently Posted <span className="highlight">Works</span>
          </h1>
        </div>
      </div>
      <div className="card-container">
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