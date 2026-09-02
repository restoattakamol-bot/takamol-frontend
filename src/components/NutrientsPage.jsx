import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const NutrientsPage = ({ language }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageExt, setImageExt] = useState('.png');
  const [allergyImageError, setAllergyImageError] = useState(false);
  const [allergyImageExt, setAllergyImageExt] = useState('.png');

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

  // Reset image extensions and errors when item or language changes
  useEffect(() => {
    setImageExt('.png');
    setImageError(false);
    setAllergyImageExt('.png');
    setAllergyImageError(false);
  }, [item, language]);

  const handleImageError = () => {
    if (imageExt === '.png') {
      setImageExt('.jpeg');
    } else if (imageExt === '.jpeg') {
      setImageExt('.jpg');
    } else {
      setImageError(true);
    }
  };

  const handleAllergyImageError = () => {
    if (allergyImageExt === '.png') {
      setAllergyImageExt('.jpeg');
    } else if (allergyImageExt === '.jpeg') {
      setAllergyImageExt('.jpg');
    } else {
      setAllergyImageError(true);
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
            src={`/${item.title}_allergy${allergyImageExt}`} 
            alt="Allergy Information"
            style={{ maxWidth: '150px', height: 'auto', marginBottom: '10px' }}
            onError={handleAllergyImageError}
          />
        )}
        <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, textAlign: 'center' }}>
          {displayTitle}
        </h2>
      </div>

      <p className="category-label" style={{ textAlign: 'center', marginTop: '10px' }}>
        {language === 'en' ? `Category: ${displayCategory}` : `التصنيف: ${displayCategory}`}
      </p>
      
      <div className="nutrients-image-wrapper" style={{ marginTop: '2rem', textAlign: 'center' }}>
        {!imageError ? (
          <img 
            src={`/nutrients/${displayTitle}${imageExt}`} 
            alt={`Nutritional facts for ${displayTitle}`} 
            style={{ maxWidth: '350px', width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            onError={handleImageError}
          />
        ) : (
          <div className="nutrients-placeholder" style={{ padding: '3rem', backgroundColor: '#f8f9fa', border: '2px dashed #ccc', borderRadius: '8px' }}>
            <h3>{language === 'en' ? 'No Nutrient Image Found' : 'لم يتم العثور على صورة الحقائق الغذائية'}</h3>
            <p>
              {language === 'en' 
                ? <>To show the image here, save it as exactly <strong>{displayTitle}.png</strong>, <strong>.jpeg</strong>, or <strong>.jpg</strong> inside the <strong>frontend/public/nutrients/</strong> folder.</>
                : <>لإظهار الصورة هنا، احفظها باسم <strong>{displayTitle}.png</strong> أو <strong>.jpeg</strong> أو <strong>.jpg</strong> داخل مجلد <strong>frontend/public/nutrients/</strong>.</>
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutrientsPage;
