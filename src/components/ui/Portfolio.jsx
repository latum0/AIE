import React from 'react';
import './Portfolio.css';

const Portfolio = ({ hideHeader = false }) => {
  // Mock data
  const portfolioItems = [
    {
      id: 1,
      title: "H-Kore Fitness Website Design",
      date: "November 2024",
      description: "This project showcases the design of a dynamic and engaging website for H-Kore, a fitness training studio. The website is designed to attract potential clients, provide key information about their services, and drive conversions through a user-friendly",
      image: "https://codedamn.com/assets/images/learnpaths/og/frontend.png",
      tags: ["Sports & Fitness", "Fitness Club/Gym/Center", "Website Design", "Website Development"],
      cost: "$1000-$2500",
      duration: "7-30 days"
    },
    // More portfolio items would go here
  ];

  return (
    <div className="portfolio-container">
      {/* Skip rendering the header if hideHeader is true */}

      <div className="portfolio-section">
        <h2 className="section-title">Portfolio</h2>
        
        {portfolioItems.map((item) => (
          <div key={item.id} className="portfolio-item">
            <div className="portfolio-main">
              <div className="portfolio-image-container">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="portfolio-image" />
                <div className="image-count">
                  <span className="image-icon">🖼</span> 1
                </div>
              </div>
              
              <div className="portfolio-content">
                <p className="portfolio-date">From: {item.date}</p>
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-description">{item.description}</p>
                
                <div className="portfolio-tags">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="portfolio-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="portfolio-meta">
                  <div className="meta-item">
                    <p className="meta-label">Project cost</p>
                    <p className="meta-value">{item.cost}</p>
                  </div>
                  <div className="meta-item">
                    <p className="meta-label">Project duration</p>
                    <p className="meta-value">{item.duration}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="portfolio-thumbnails">
              <div className="thumbnail">
                <img src="https://commercetools.com/assets/blog/business-blog/2023-blogpost-frontend-solution.png" alt="Thumbnail 1" />
              </div>
              <div className="thumbnail">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx37pHeJnzuPi0sFXFKHNNPdQ0CBRN6ed_Uw&s" alt="Thumbnail 2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;