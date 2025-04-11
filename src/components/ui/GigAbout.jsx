import React from 'react';
import './GigAbout.css';

const GigAbout = ({ description }) => {
  return (
    <div className="about-gig">
      <h3 className="title">About This Gig</h3>
      <div className="content" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default GigAbout;