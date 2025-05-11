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
            alt={`Avatar de ${user.name}`} 
            onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${user.initials}`} 
          />
        </div>
        <div className="details">
          <div className="name">{user.name}</div>
          <div className="location">
            <img src={user.flag} alt="Drapeau du pays" />
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
        <div>Utile ?</div>
        <button className="vote-btn upvote">
          <FaThumbsUp /> Oui
        </button>
        <button className="vote-btn downvote">
          <FaThumbsDown /> Non
        </button>
      </div>

      <div className="seller-response">
        <div className="avatar">
          <img 
            src={response.avatar} 
            alt="Avatar du vendeur" 
            onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${response.initials}`} 
          />
        </div>
        <div className="response-content">
          <div className="header">
            Réponse du vendeur
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
