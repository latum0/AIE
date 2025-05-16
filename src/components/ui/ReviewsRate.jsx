import React from 'react';
import { FaStar } from "react-icons/fa"
import "./ReviewsRate.css"

const ReviewsRate = ({
  title = "Avis des utilisateurs",
  totalReviews = 0,
  averageRating = 0,
  starCounts = [],
  ratingBreakdown = [],
}) => {
  const safeAverage = typeof averageRating === "number" ? averageRating : 0
  const safeTotal = typeof totalReviews === "number" && totalReviews > 0 ? totalReviews : 0

  return (
    <div className="reviews-rate-container">
      <h2 className="reviews-title">{title}</h2>

      <div className="reviews-header-section">
        <div className="reviews-rating-summary">
          <div className="reviews-average-rating">{safeAverage.toFixed(1)}</div>

          <div className="reviews-star-rating">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < Math.round(safeAverage) ? "#FF8C42" : "#E0E0E0"} size={24} />
            ))}
          </div>

          <div className="reviews-total-reviews">{safeTotal} avis</div>
        </div>
      </div>

      <div className="reviews-breakdown-section">
        {Array.isArray(starCounts) &&
          starCounts.map((count, index) => (
            <div key={index} className="reviews-star-breakdown-row">
              <div className="reviews-star-label">{5 - index} Étoiles</div>

              <div className="reviews-progress-container">
                <div
                  className="reviews-progress-bar"
                  style={{ width: `${safeTotal > 0 ? ((count / safeTotal) * 100).toFixed(1) : 0}%` }}
                ></div>
              </div>

              <div className="reviews-count">{count}</div>
            </div>
          ))}
      </div>

      <div className="reviews-detailed-breakdown">
        {Array.isArray(ratingBreakdown) &&
          ratingBreakdown.map((item, index) => (
            <div key={index} className="reviews-breakdown-item">
              <span className="reviews-criteria">{item.criteria}</span>

              <div className="reviews-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < item.rating ? "#FF8C42" : "#E0E0E0"} size={18} />
                ))}
                <span className="reviews-score">{item.rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ReviewsRate;
