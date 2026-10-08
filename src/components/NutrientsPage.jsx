import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const NutrientsPage = ({ language }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allergyImageError, setAllergyImageError] = useState(false);
  const [allergyImageExt, setAllergyImageExt] = useState('.png');
  const [nutrientsImageError, setNutrientsImageError] = useState(false);
  const [nutrientsImageExt, setNutrientsImageExt] = useState('.png');
  const [useArabicNutrients, setUseArabicNutrients] = useState(language === 'ar');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/menu/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError(language === 'en' ? 'Failed to fetch item details.' : 'فشل في تحميل تفاصيل الوجبة.');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, language]);

  // Reset allergy image extensions and errors when item or language changes
  useEffect(() => {
    setAllergyImageExt('.png');
    setAllergyImageError(false);
    setNutrientsImageExt('.png');
    setNutrientsImageError(false);
    setUseArabicNutrients(language === 'ar');
  }, [item, language]);



  const handleAllergyImageError = () => {
    if (allergyImageExt === '.png') {
      setAllergyImageExt('.jpeg');
    } else if (allergyImageExt === '.jpeg') {
      setAllergyImageExt('.jpg');
    } else {
      setAllergyImageError(true);
    }
  };

  const handleNutrientsImageError = () => {
    if (nutrientsImageExt === '.png') {
      setNutrientsImageExt('.jpeg');
    } else if (nutrientsImageExt === '.jpeg') {
      setNutrientsImageExt('.jpg');
    } else if (useArabicNutrients) {
      setUseArabicNutrients(false);
      setNutrientsImageExt('.png');
    } else {
      setNutrientsImageError(true);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="error">{language === 'en' ? 'Item not found.' : 'لم يتم العثور على الوجبة.'}</div>;

  const displayTitle = language === 'en' ? item.title : (item.titleAr || item.title);
  const displayCategory = language === 'en' ? item.category : (item.categoryAr || item.category);

  return (
    <div className="nutrients-container">
      <Link to="/" className="back-link">
        {language === 'en' ? '\u2190 Back to Menu' : 'العودة للقائمة \u2192'}
      </Link>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
        {!allergyImageError && (
          <img 
            src={`/${item.imageName || item.title}_allergy${allergyImageExt}`} 
            alt="Allergy Information"
            style={{ maxWidth: '150px', height: 'auto', marginBottom: '10px' }}
            onError={handleAllergyImageError}
          />
        )}
        <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, textAlign: 'center' }}>
          {displayTitle}
        </h2>
      </div>

      <p className="category-label" style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>
        {language === 'en' ? `Category: ${displayCategory}` : `التصنيف: ${displayCategory}`}
      </p>

      {!nutrientsImageError && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <img 
            src={`/nutrients/${item.imageName || item.title}${useArabicNutrients ? ' Arabic' : ''}${nutrientsImageExt}`} 
            alt="Nutritional Information"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            onError={handleNutrientsImageError}
          />
        </div>
      )}

    </div>
  );
};

export default NutrientsPage;
