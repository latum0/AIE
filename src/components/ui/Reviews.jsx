// src/components/ui/Reviews.jsx
import React from 'react';
import './Reviews.css';

const Reviews = ({ hideHeader = false }) => {
  // Données factices
  const ratingBreakdown = {
    5: 59,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };

  const totalReviews = 59;

  const ratingCategories = [
    { name: "Niveau de communication du vendeur", rating: 5 },
    { name: "Qualité de la livraison", rating: 5 },
    { name: "Rapport qualité-prix", rating: 5 }
  ];

  const reviewsList = [
    {
      id: 1,
      username: "zhir_1",
      country: "États-Unis",
      rating: 5,
      date: "Il y a 2 semaines",
      comment: "Je ne savais pas trop à quoi m'attendre, mais il a vraiment bien livré. A pris le temps de bien faire dès la première fois. Tout fonctionne bien et l'aspect visuel est parfait. Merci encore !",
      price: "US$50-US$100",
      duration: "3 jours",
      service: "Sites sur mesure"
    }
    // Vous pouvez ajouter d'autres avis ici
  ];

  return (
    <div className="reviews-container">
      {/* Ne pas afficher l'en-tête si hideHeader est true */}
      <div className="reviews-section">
        <div className="reviews-header">
          <h2 className="section-title">{totalReviews} Avis</h2>
          <div className="overall-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star-icon">★</span>
              ))}
            </div>
            <span className="rating-value">5.0</span>
          </div>
        </div>

        <div className="reviews-content">
          <div className="rating-breakdown">
            <h3 className="breakdown-title">Détails des notes</h3>

            <div className="stars-breakdown">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="star-row">
                  <span className="star-label">{star} Étoiles</span>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${(ratingBreakdown[star] / totalReviews) * 100}%`,
                        backgroundColor: star === 5 ? '#1dbf73' : '#eee'
                      }}
                    ></div>
                  </div>
                  <span className="star-count">({ratingBreakdown[star]})</span>
                </div>
              ))}
            </div>

            <div className="rating-categories">
              {ratingCategories.map((category, index) => (
                <div key={index} className="category-row">
                  <span className="category-name">{category.name}</span>
                  <div className="category-rating">
                    <span className="star-icon">★</span>
                    <span className="category-value">{category.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reviews-list-container">
            <div className="reviews-search">
              <input 
                type="text" 
                placeholder="Rechercher un avis" 
                className="search-input" 
              />
              <button className="search-btn">🔍</button>
            </div>

            <div className="reviews-filter">
              <span className="reviews-count">1-5 sur {totalReviews} Avis</span>
              <div className="sort-dropdown">
                <span>Trier par</span>
                <select className="sort-select">
                  <option>Pertinence</option>
                  <option>Date (récent)</option>
                  <option>Note la plus élevée</option>
                </select>
              </div>
            </div>

            <div className="reviews-list">
              {reviewsList.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        <span className="avatar-letter">{review.username.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="reviewer-details">
                        <h4 className="reviewer-name">{review.username}</h4>
                        <div className="reviewer-country">
                          <span className="country-flag">🇺🇸</span>
                          <span>{review.country}</span>
                        </div>
                      </div>
                    </div>
                    <div className="review-rating">
                      <div className="stars">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="star-icon">★</span>
                        ))}
                      </div>
                      <span className="rating-value">{review.rating}</span>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>

                  <p className="review-comment">{review.comment}</p>

                  <div className="review-meta">
                    <div className="meta-item">
                      <h5 className="meta-title">{review.price}</h5>
                      <p className="meta-subtitle">Prix</p>
                    </div>
                    <div className="meta-item">
                      <h5 className="meta-title">{review.duration}</h5>
                      <p className="meta-subtitle">Durée</p>
                    </div>
                    <div className="meta-item service-item">
                      <div className="service-icon">
                        <img src="/placeholder.svg?height=30&width=30" alt="Service" />
                      </div>
                      <p className="service-name">{review.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;