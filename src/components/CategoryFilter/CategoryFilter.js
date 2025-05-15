import React from "react";
import "./CategoryFilter.css";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      <div className="category-pills">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-pill ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
