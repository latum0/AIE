import React from 'react';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"
import "./ReviewsComment.css"

const ReviewsComment = ({ user, rating, content, helpfulVotes, response }) => {
  return (
    <div className="review-comment-container">
      <div className="review-user-info">
        <div className="review-avatar">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={`Avatar ${user.name}`}
            onError={(e) => (e.target.src = `https://ui-avatars.com/api/?name=${user.initials}`)}
          />
        </div>
        <div className="review-details">
          <div className="review-name">{user.name}</div>
          <div className="review-location">
            <img src={user.flag || "/placeholder.svg"} alt="Drapeau pays" className="review-flag" />
            {user.country}
          </div>
        </div>
      </div>

      <div className="review-rating-section">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`review-star ${i < rating ? "filled" : ""}`}>
            ★
          </span>
        ))}
        <span className="review-timestamp">{response.timestamp}</span>
      </div>

      <div className="review-content">{content}</div>

      <div className="review-helpful-section">
        <div className="review-helpful-text">Utile ?</div>
        <button className="review-vote-btn review-upvote">
          <FaThumbsUp /> <span>Oui</span>
        </button>
        <button className="review-vote-btn review-downvote">
          <FaThumbsDown /> <span>Non</span>
        </button>
      </div>

      <div className="review-seller-response">
        <div className="review-avatar">
          <img
            src={response.avatar || "/placeholder.svg"}
            alt="Avatar vendeur"
            onError={(e) => (e.target.src = `https://ui-avatars.com/api/?name=${response.initials}`)}
          />
        </div>
        <div className="review-response-content">
          <div className="review-header">Réponse du vendeur</div>
          <div className="review-message">{response.message}</div>
        </div>
      </div>
    </div>
  )
}

export default ReviewsComment
