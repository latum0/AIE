// src/components/Navigation.jsx
import React from 'react';
import './Navigation.css';

const Navigation = ({ activeTab, onTabChange }) => {
  const navItems = ["À propos", "Services", "Portfolio", "Avis"];

  return (
    <nav className="profile-nav">
      <ul>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={item === activeTab ? 'active' : ''}
            onClick={() => onTabChange(item)}
          >
            <a href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={(e) => e.preventDefault()}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;