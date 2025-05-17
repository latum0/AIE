import React from 'react';
import './CategoryNavbar.css';

function CategoryNavbar() {
  const categories = [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business',
    'Photography',
  ];

  return (
    <div className="category-navbar">
      {categories.map((cat, index) => (
        <a key={index} href="#">{cat}</a>
      ))}
    </div>
  );
}

export default CategoryNavbar;
