import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menu items. Please make sure the backend is running.');
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter items based on search term
  const filteredItems = menuItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  if (loading) return <div className="loading">Loading menu...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search menu items..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {Object.entries(groupedItems).length === 0 ? (
        <div className="no-results">No items found matching your search.</div>
      ) : (
        Object.entries(groupedItems).map(([category, items]) => (
          <section key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="items-grid">
              {items.map(item => (
                <Link to={`/item/${item._id}`} key={item._id} className="item-card">
                  <div>
                    <h3 className="item-title">{item.title}</h3>
                  </div>
                  <div className="view-nutrients">
                    View Nutrients &rarr;
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default MenuPage;
