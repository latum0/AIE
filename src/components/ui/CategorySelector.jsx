import React from 'react';
import './CategorySelector.css';

const CategorySelector = () => {
  return (
    <div className="category-container">
      <label>Category</label>
      <p>Choose the category and sub-category most suitable for your Gig.</p>
      <div className="dropdowns">
        <select>
          <option>SELECT A CATEGORY</option>
        </select>
        <select>
          <option>SELECT A SUBCATEGORY</option>
        </select>
      </div>
    </div>
  );
};

export default CategorySelector;
