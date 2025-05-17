"use client"

import React from 'react';
// src/components/ui/Reviews.jsx
import { useState } from "react"
import { FaStar, FaSearch, FaFlag, FaGlobe, FaThumbsUp, FaThumbsDown } from "react-icons/fa"
import "./Reviews.css"

const Reviews = ({ hideHeader = false }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("relevance")

  // Données factices
  const ratingBreakdown = {
    5: 59,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  }

  const totalReviews = 59

  const ratingCategories = [
    { name: "Niveau de communication du vendeur", rating: 5 },
    { name: "Qualité de la livraison", rating: 5 },
    { name: "Rapport qualité-prix", rating: 5 },
  ]

  const reviewsList = [
    {
      id: 1,
      username: "zhir_1",
      country: "États-Unis",
      rating: 5,
      date: "Il y a 2 semaines",
      comment:
        "Je ne savais pas trop à quoi m'attendre, mais il a vraiment bien livré. A pris le temps de bien faire dès la première fois. Tout fonctionne bien et l'aspect visuel est parfait. Merci encore !",
      price: "US$50-US$100",
      duration: "3 jours",
      service: "Sites sur mesure",
      helpful: 12,
      notHelpful: 1,
    },
    {
      id: 2,
      username: "marie_dev",
      country: "France",
      rating: 5,
      date: "Il y a 1 mois",
      comment:
        "Excellent travail ! Le développeur a parfaitement compris mes besoins et a livré un site qui dépasse mes attentes. Communication claire et professionnelle tout au long du projet.",
      price: "US$100-US$200",
      duration: "5 jours",
      service: "Applications React",
      helpful: 8,
      notHelpful: 0,
    },
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  // Filtrer les avis en fonction du terme de recherche
  const filteredReviews = reviewsList.filter(
    (review) =>
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="reviews-container">
      <div className="reviews-section">
        <div className="reviews-header">
          <h2 className="section-title">{totalReviews} Avis</h2>
          <div className="overall-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
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
                  <span className="star-label">
                    {star} <FaStar className="small-star" />
                  </span>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${(ratingBreakdown[star] / totalReviews) * 100}%`,
                        backgroundColor: star === 5 ? "#FF8C42" : "#eee",
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
                    <FaStar className="star-icon" />
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
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="search-btn">
                <FaSearch />
              </button>
            </div>

            <div className="reviews-filter">
              <span className="reviews-count">
                1-{filteredReviews.length} sur {totalReviews} Avis
              </span>
              <div className="sort-dropdown">
                <span>Trier par</span>
                <select className="sort-select" value={sortBy} onChange={handleSortChange}>
                  <option value="relevance">Pertinence</option>
                  <option value="recent">Date (récent)</option>
                  <option value="highest">Note la plus élevée</option>
                </select>
              </div>
            </div>

            <div className="reviews-list">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          <span className="avatar-letter">{review.username.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="reviewer-details">
                          <h4 className="reviewer-name">{review.username}</h4>
                          <div className="reviewer-country">
                            <FaGlobe className="country-icon" />
                            <span>{review.country}</span>
                          </div>
                        </div>
                      </div>
                      <div className="review-rating">
                        <div className="stars">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} className="star-icon" />
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

                    <div className="review-actions">
                      <div className="helpful-buttons">
                        <span>Cet avis vous a-t-il été utile ?</span>
                        <button className="helpful-btn">
                          <FaThumbsUp /> Oui ({review.helpful})
                        </button>
                        <button className="not-helpful-btn">
                          <FaThumbsDown /> Non ({review.notHelpful})
                        </button>
                      </div>
                      <button className="report-btn">
                        <FaFlag /> Signaler
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reviews">
                  <p>Aucun avis ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
