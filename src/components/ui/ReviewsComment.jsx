import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './ReviewsComment.css';

const ReviewsComment = ({ 
  user, 
  rating, 
  content, 
  helpfulVotes, 
  response 
}) => {
  return (
    <div className="review-container">
      <div className="user-info">
        <div className="avatar">
          <img 
            src={user.avatar} 
            alt={`${user.name} avatar`} 
            onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${user.initials}`} 
          />
        </div>
        <div className="details">
          <div className="name">{user.name}</div>
          <div className="location">
            <img src={user.flag} alt="Country flag" />
            {user.country}
          </div>
        </div>
      </div>

      <div className="rating-section">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
            ★
          </span>
        ))}
        <span className="timestamp">{response.timestamp}</span>
      </div>

      <div className="content">
        {content}
      </div>

      <div className="helpful-section">
        <div>Helpful?</div>
        <button className="vote-btn upvote">
          <FaThumbsUp /> Yes
        </button>
        <button className="vote-btn downvote">
          <FaThumbsDown /> No
        </button>
      </div>

      <div className="seller-response">
        <div className="avatar">
          <img 
            src={response.avatar} 
            alt="Seller avatar" 
            onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${response.initials}`} 
          />
        </div>
        <div className="response-content">
          <div className="header">
            Seller's Response
          </div>
          <div className="message">
            {response.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsComment;