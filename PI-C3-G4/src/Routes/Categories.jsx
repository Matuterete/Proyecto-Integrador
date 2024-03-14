import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import requestToAPI from '../services/requestToAPI';
import '../Components/styles/Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await requestToAPI('http://prothechnics.us.to:8080/categories/find/all', 'GET');
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <div className="categories">
      <h1>Categorías</h1>
      <div className="categories-container">
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              <Link to={`/categories/${category.id}`}>
                <img src={category.url} alt={category.title} />
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;