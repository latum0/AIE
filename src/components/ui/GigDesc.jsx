"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GigDesc.css";

const GigDesc = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0
        ? data.images && data.images.length > 0
          ? data.images.length - 1
          : 0
        : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      data.images && prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleProfileClick = () => {
    const freelancerId = data.user
      ? data.user._id || data.user.id
      : data.userId || data._id || data.id;
    if (freelancerId) {
      navigate(`/freelancerProfile/${freelancerId}`);
    }
  };

  return (
    <div className="gig-desc">
      <h1 className="main-title">{data.title}</h1>

      <div className="horizontal-section-desc">
        <div className="profile-section-desc">
          <a
            href="#"
            className="profile-link"
            onClick={(e) => {
              e.preventDefault();
              handleProfileClick();
            }}
          >
            <img
              src={data.profilePicture || "/placeholder.svg"}
              alt={`Profil ${data.username}`}
              className="profile-picture"
            />
            <div className="username">{data.username}</div>
          </a>
        </div>

        <div className="rating-container">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="star">
              ★
            </span>
          ))}
          <span className="rating-number">{data.rating}</span>
          <span className="feedback-count">({data.feedbackCount})</span>
        </div>

        <div className="queue-info">
          {data.queueCount} commandes en file d'attente
        </div>
      </div>

      <div className="carousel">
        <button className="arrow left-arrow" onClick={handlePrevImage}>
          &lt;
        </button>

        <img
          src={
            data.images && data.images.length > 0
              ? data.images[currentImageIndex]
              : "/placeholder.svg"
          }
          alt={`Image ${currentImageIndex + 1}`}
          className="main-image"
        />

        <button className="arrow right-arrow" onClick={handleNextImage}>
          &gt;
        </button>
      </div>

      <div className="thumbnails">
        {data.images &&
          data.images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${
                index === currentImageIndex ? "active" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default GigDesc;
