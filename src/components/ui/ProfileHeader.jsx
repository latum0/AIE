// src/components/ui/ProfileHeader.jsx
import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ hideHeader = false }) => {
  const profileData = {
    name: "Atif Ul Maruf",
    username: "@sync_lab",
    rating: 5.0,
    reviews: 59,
    level: "Niveau 1",
    location: "Bangladesh",
    language: "Anglais",
    isOnline: false,
    localTime: "01:47 AM heure locale",
    responseTime: "1 heure",
    bio: "Bonjour, je suis un développeur web full-stack passionné par la création de sites et d'applications qui fonctionnent parfaitement. J'utilise des outils comme React, Node.js et Laravel pour construire à la fois le front-end et le back-end de votre site web.",
    skills: [
      "Développement web",
      "Design responsive",
      "Création de landing page",
      "Rédaction de contenu web",
      "Développement de landing page"
    ]
  };

  return (
    <div className="profile-container">
      {!hideHeader && (
        <div className="profile-main">
          <div className="profile-left">
            <div className="profile-avatar-container">
              <img src="/placeholder.svg?height=120&width=120" alt="Profil" className="profile-avatar" />
              <div className="profile-logo">A</div>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{profileData.name}</h1>
              <p className="profile-username">{profileData.username}</p>
              <div className="profile-rating">
                <span className="star-icon">★</span>{profileData.rating} ({profileData.reviews})
                <span className="profile-level">{profileData.level}</span>
              </div>
              <div className="profile-details">
                <div className="profile-location">
                  <span className="location-icon">📍</span>{profileData.location}
                </div>
                <div className="profile-language">
                  <span className="language-icon">🌐</span>{profileData.language}
                </div>
              </div>
            </div>
          </div>
          <div className="profile-right">
            <button className="more-about-btn">Plus d'info</button>
            <button className="favorite-btn">♡</button>
          </div>
        </div>
      )}

      <div className="profile-about">
        <h2 className="section-title">À propos de moi</h2>
        <p className="about-text">{profileData.bio}</p>

        <div className="skills-section">
          <h3 className="skills-title">Compétences</h3>
          <div className="skills-tags">
            {profileData.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
            <span className="more-skills">+10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;