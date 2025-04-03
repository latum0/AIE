import React from 'react';
import './Category.css';

const Category = () => {
  const categories = [
    { name: 'Graphic & Design', image: 'src/assets/icons/graphic.png' },
    { name: 'Cartoon Animation', image: 'src/assets/icons/animation.png' },
    { name: 'Illustration', image: 'src/assets/icons/illustration.png' },
    { name: 'Flyers & Vouchers', image: 'src/assets/icons/vouchers.png' },
    { name: 'Logo Design', image: 'src/assets/icons/logoCat.png' },
    { name: 'Social Graphics', image: 'src/assets/icons/social.png' },
    { name: 'Article Writing', image: 'src/assets/icons/article.png' },
    { name: 'Video Editing', image: 'src/assets/icons/videoEditing.png' }
  ];

  return (
    <div className="category-container">
      <h2 className="section-title">
        Choose Different <span className="highlight">Category</span>
      </h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img 
              src={category.image} 
              alt={category.name} 
              className="category-image"
            />
            <div className="category-overlay">
              <h3 className="category-name">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <button className="more-btn">More Categories</button>
    </div>
  );
};

export default Category;