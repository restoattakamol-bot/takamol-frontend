import React from 'react';
import { Link } from 'react-router-dom';
import './AllergiesPage.css';

const allergensData = [
  { id: 'gluten', nameEn: 'Gluten', nameAr: 'جلوتين', imgPath: '/gluten.png' },
  { id: 'peanuts', nameEn: 'Peanuts', nameAr: 'فول سوداني', imgPath: '/peanuts.png' },
  { id: 'celery', nameEn: 'Celery', nameAr: 'كرفس', imgPath: '/celery.png' },
  { id: 'nuts', nameEn: 'Nuts', nameAr: 'مكسرات', imgPath: '/nuts.png' },
  { id: 'mustard', nameEn: 'Mustard', nameAr: 'خردل', imgPath: '/mustard.png' },
  { id: 'eggs', nameEn: 'Eggs', nameAr: 'بيض', imgPath: '/eggs.png' },
  { id: 'sesame', nameEn: 'Sesame', nameAr: 'سمسم', imgPath: '/sesame.png' },
  { id: 'milk', nameEn: 'Milk', nameAr: 'حليب', imgPath: '/milk.png' },
  { id: 'fish', nameEn: 'Fish', nameAr: 'سمك', imgPath: '/fish.png' },
  { id: 'soya', nameEn: 'Soya', nameAr: 'صويا', imgPath: '/soya.png' },
];

const AllergiesPage = ({ language }) => {
  return (
    <div className="container allergies-page-container">
      <Link to="/" className="back-link" style={{ display: 'inline-block', marginBottom: '20px', color: '#030986', textDecoration: 'none', fontWeight: 'bold' }}>
        {language === 'en' ? '← Back to Menu' : '← العودة إلى القائمة'}
      </Link>
      
      <div className="allergies-content">
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#030986' }}>
          {language === 'en' ? 'Allergen Icons' : 'رموز مسببات الحساسية'}
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '40px', color: '#555' }}>
          {language === 'en' 
            ? 'These icons represent common allergens, helping you quickly identify the ingredients to avoid due to allergies.'
            : 'تمثل هذه الرموز مسببات الحساسية الشائعة، مما يساعدك على التعرف بسرعة على المكونات التي يجب تجنبها.'}
        </p>

        <div className="allergies-grid-large">
          {allergensData.map((allergen) => (
            <div key={allergen.id} className="allergen-item-large" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img 
                src={allergen.imgPath} 
                alt={allergen.nameEn} 
                style={{ width: '300px', height: '300px', objectFit: 'contain', marginBottom: '-90px' }}
              />
              <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#333', position: 'relative', zIndex: 2 }}>
                {language === 'en' ? allergen.nameEn : allergen.nameAr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllergiesPage;
