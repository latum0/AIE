import { FaStar } from 'react-icons/fa';
import './ReviewsRate.css';

const ReviewsRate = ({ 
  title, 
  totalReviews, 
  averageRating, 
  starCounts, 
  ratingBreakdown 
}) => {
  return (
    <div className="review-container">
      <h2 className="title">{title}</h2>
      
      <div className="header-section">
        <div className="rating-summary">
          <div className="average-rating">{averageRating.toFixed(1)}</div>
          <div className="star-rating">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                color={i < Math.floor(averageRating) ? '#FF8C42' : '#E0E0E0'}
                size={20}
              />
            ))}
          </div>
          <div className="total-reviews">{totalReviews} avis</div>
        </div>
      </div>

      <div className="breakdown-section">
        {starCounts.map((count, index) => (
          <div key={index} className="star-breakdown-row">
            <div className="star-label">{5 - index} étoiles</div>
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ width: `${(count / totalReviews * 100)}%` }}
              ></div>
            </div>
            <div className="count">{count}</div>
          </div>
        ))}
      </div>

      <div className="detailed-breakdown">
        {ratingBreakdown.map((item, index) => (
          <div key={index} className="breakdown-item">
            <span className="criteria">{item.criteria}</span>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  color={i < item.rating ? '#FF8C42' : '#E0E0E0'}
                  size={16}
                />
              ))}
              <span className="score">{item.rating.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsRate;
