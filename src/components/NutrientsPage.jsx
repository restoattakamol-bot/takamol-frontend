import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const NutrientsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageExt, setImageExt] = useState('.png');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/menu/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch item details.');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleImageError = () => {
    if (imageExt === '.png') {
      setImageExt('.jpeg');
    } else if (imageExt === '.jpeg') {
      setImageExt('.jpg');
    } else {
      setImageError(true);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="error">Item not found.</div>;

  return (
    <div className="nutrients-container">
      <Link to="/" className="back-link">&larr; Back to Menu</Link>
      <h2>{item.title}</h2>
      <p className="category-label">Category: {item.category}</p>
      
      <div className="nutrients-image-wrapper" style={{ marginTop: '2rem', textAlign: 'center' }}>
        {!imageError ? (
          <img 
            src={`/nutrients/${item.title}${imageExt}`} 
            alt={`Nutritional facts for ${item.title}`} 
            style={{ maxWidth: '350px', width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            onError={handleImageError}
          />
        ) : (
          <div className="nutrients-placeholder" style={{ padding: '3rem', backgroundColor: '#f8f9fa', border: '2px dashed #ccc', borderRadius: '8px' }}>
            <h3>No Nutrient Image Found</h3>
            <p>To show the image here, save it as exactly <strong>{item.title}.png</strong>, <strong>.jpeg</strong>, or <strong>.jpg</strong> inside the <strong>frontend/public/nutrients/</strong> folder.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutrientsPage;
