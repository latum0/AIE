import React from 'react';
import './GigTitle.css';

const GigTitle = () => {
  return (
    <div className="gigtitle-container">
      <label>Gig title</label>
      <p>As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
      <input type="text" placeholder="I will do something I'm really good at" maxLength={80} />
      <div className="char-count">0 / 80 max</div>
    </div>
  );
};

export default GigTitle;
