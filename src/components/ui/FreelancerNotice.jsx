import React from 'react';
import './FreelancerNotice.css';
import { FaInfoCircle } from 'react-icons/fa';

const FreelancerNotice = ({ language = 'en' }) => {
  const content = {
    en: {
      message: 'Are you a freelancer?',
      action: 'Become a seller',
      link: '/become-a-seller',
    },
    fr: {
      message: 'Vous êtes freelance ?',
      action: 'Devenez vendeur',
      link: '/devenir-vendeur',
    },
  };

  const { message, action, link } = content[language] || content.en;

  return (
    <div className="freelancer-notice">
      <div className="left">
        <FaInfoCircle className="icon-info" />
        <span>{message}</span>
      </div>
      <a href={link} className="become-seller">{action}</a>
    </div>
  );
};

export default FreelancerNotice;
