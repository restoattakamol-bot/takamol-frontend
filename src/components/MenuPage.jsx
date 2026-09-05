import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const MenuPage = ({ language }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/menu`);
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menu items. Please make sure the backend is running.');
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter items based on search term and language
  const filteredItems = menuItems.filter(item => {
    const searchTarget = language === 'en' ? item.title : (item.titleAr || '');
    return searchTarget.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Group items by category based on language
  const groupedItems = filteredItems.reduce((acc, item) => {
    const categoryTarget = language === 'en' ? item.category : (item.categoryAr || item.category);
    if (!acc[categoryTarget]) {
      acc[categoryTarget] = [];
    }
    acc[categoryTarget].push(item);
    return acc;
  }, {});

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="header-actions" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div className="search-container" style={{ margin: '0', flex: '1', minWidth: '250px', maxWidth: '400px' }}>
          <input 
            type="text" 
            placeholder={language === 'en' ? "Search menu items..." : "ابحث عن الوجبات..."}
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/allergies" className="action-button" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#030986',
            color: 'white',
            padding: '0 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            height: '42px',
            whiteSpace: 'nowrap'
          }}>
            {language === 'en' ? 'Allergies' : 'الحساسية'}
          </Link>
          <Link to="/heat-food" className="action-button" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#030986',
            color: 'white',
            padding: '0 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            height: '42px',
            whiteSpace: 'nowrap'
          }}>
            {language === 'en' ? 'How To Heat Food' : 'طريقة تسخين الطعام'}
          </Link>
        </div>
      </div>
      
      {Object.entries(groupedItems).length === 0 ? (
        <div className="no-results">
          {language === 'en' ? "No items found matching your search." : "لم يتم العثور على وجبات تطابق بحثك."}
        </div>
      ) : (
        Object.entries(groupedItems).map(([category, items]) => (
          <section key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="items-grid">
              {items.map(item => (
                <Link to={`/item/${item._id}`} key={item._id} className="item-card">
                  <div>
                    <h3 className="item-title">
                      {language === 'en' ? item.title : (item.titleAr || item.title)}
                    </h3>
                  </div>
                  <div className="view-nutrients">
                    {language === 'en' ? 'View Details \u2192' : '\u2190 عرض التفاصيل'}
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
