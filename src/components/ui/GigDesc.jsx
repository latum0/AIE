import React from 'react';
import './GigDesc.css';

const GigDesc = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="gig-desc">
      <h1 className="main-title">{data.title}</h1>
      
      <div className="horizontal-section-desc">
        <div className="profile-section-desc">
          <a href={`/profile/${data.username}`} className="profile-link">
            <img 
              src={data.profilePicture} 
              alt={`${data.username} profile`} 
              className="profile-picture"
            />
            <span className="username">{data.username}</span>
          </a>
        </div>

        <div className="rating-container">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="star">★</span>
            ))}
          </div>
          <span className="feedback-count">({data.feedbackCount})</span>
        </div>

        <div className="queue-info">
          {data.queueCount} Orders in Queue
        </div>
      </div>

      <div className="carousel">
        <button 
          className="arrow left-arrow" 
          onClick={() => setCurrentImageIndex(prev => Math.max(prev - 1, 0))}
        >
          ‹
        </button>
        <img 
          src={data.images[currentImageIndex]} 
          alt={`Gig preview ${currentImageIndex + 1}`} 
          className="main-image"
        />
        <button 
          className="arrow right-arrow" 
          onClick={() => setCurrentImageIndex(prev => Math.min(prev + 1, data.images.length - 1))}
        >
          ›
        </button>
      </div>

      <div className="thumbnails">
        {data.images.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Thumbnail ${index + 1}`} 
            className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`} 
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GigDesc;