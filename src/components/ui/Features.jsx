import React from 'react';
import './Features.css';
import lock from '../../assets/icons/lock.png';
import searchWork from '../../assets/icons/searchWork.png';
import save from '../../assets/icons/save.png';

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'Create Account',
      description: 'First you have to create a account here',
      icon: lock
    },
    {
      id: 2,
      title: 'Search work',
      description: 'Search the best freelance work here',
      icon: searchWork
    },
    {
      id: 3,
      title: 'Save and apply',
      description: 'Apply or save and start your work',
      icon: save
    }
  ];

  return (
    <section className="features-section">
      <div className="feature-card">
        {features.map((feature) => (
          <div key={feature.id} className="feature-item">
            <img 
              src={feature.icon} 
              alt={feature.title} 
              className="feature-icon"
            />
            <div className="feature-content">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;