import React from 'react';
import { Link } from 'react-router-dom';
import './HeatFoodPage.css';

const HeatFoodPage = ({ language }) => {
  return (
    <div className="container heat-food-page">
      <Link to="/" className="back-link" style={{ display: 'inline-block', marginBottom: '20px', color: '#030986', textDecoration: 'none', fontWeight: 'bold' }}>
        {language === 'en' ? '← Back to Menu' : '← العودة إلى القائمة'}
      </Link>
      
      <div className="heat-food-content">
        {/* Top Section - Preservation */}
        <div className="preservation-section">
          <div className="preservation-header">
            <h2 className="section-title">
              {language === 'en' ? 'The Correct Method Of Preservation' : 'الطريقة الصحيحة للحفظ'}
            </h2>
          </div>
          <div className="preservation-desc">
            <p>
              {language === 'en' 
                ? 'It Is Stored At A Temperature Of 0 - 5 Degrees Celsius' 
                : 'يحفظ في درجة حرارة من 0 - 5 درجات مئوية'}
            </p>
          </div>
        </div>

        <hr className="divider" />

        {/* Middle Section - Heating Guide */}
        <div className="heating-section">
          <div className="heating-header">
            <div>
              <h2 className="section-title">
                {language === 'en' ? 'How To Heat Food' : 'طريقة تسخين الطعام'}
              </h2>
              <p className="section-subtitle">
                {language === 'en' 
                  ? 'Guide for heating our canned food for a hot and delicious meal' 
                  : 'دليل لتسخين طعامنا المعلب لوجبة ساخنة ولذيذة'}
              </p>
            </div>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <img src="/step1.png" alt="Step 1" className="step-icon" />
              <div className="step-number">01</div>
              <p className="step-text">
                {language === 'en' ? 'Remove the plastic cover from the meal' : 'قم بإزالة الغطاء البلاستيكي من الوجبة'}
              </p>
            </div>
            
            <div className="step-card">
              <img src="/step2.png" alt="Step 2" className="step-icon" />
              <div className="step-number">02</div>
              <p className="step-text">
                {language === 'en' ? 'Make sure the microwave is running at a temperature of no less than 74 degrees Celsius while heating' : 'تأكد من تشغيل الميكروويف على درجة حرارة لا تقل عن 74 درجة مئوية أثناء التسخين'}
              </p>
            </div>

            <div className="step-card">
              <img src="/step3.png" alt="Step 3" className="step-icon" />
              <div className="step-number">03</div>
              <p className="step-text">
                {language === 'en' ? 'Turn the food while heating to ensure that all parts of the food are heated' : 'قلب الطعام أثناء التسخين لضمان تسخين جميع أجزاء الطعام'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Specific Instructions */}
        <div className="specifics-grid">
          <div className="specific-item">
            <img src="/chicken.png" alt="Chicken" className="specific-icon" />
            <p className="specific-text">
              {language === 'en' ? 'Chicken meals from 45 to 90 seconds, as desired' : 'وجبات الدجاج من 45 إلى 90 ثانية حسب الرغبة'}
            </p>
          </div>

          <div className="specific-item">
            <img src="/sandwich.png" alt="Sandwich" className="specific-icon" />
            <p className="specific-text">
              {language === 'en' ? 'The sandwich is heated for 15 to 30 seconds, depending on preference' : 'يتم تسخين الساندويتش لمدة 15 إلى 30 ثانية حسب الرغبة'}
            </p>
          </div>

          <div className="specific-item">
            <img src="/meat.png" alt="Meat" className="specific-icon" />
            <p className="specific-text">
              {language === 'en' ? 'Meat meals last from 60 to 90 seconds, as desired' : 'وجبات اللحوم تستمر من 60 إلى 90 ثانية حسب الرغبة'}
            </p>
          </div>

          <div className="specific-item warning-item">
            <img src="/warning.png" alt="Warning" className="specific-icon" />
            <p className="specific-text warning-text">
              {language === 'en' ? 'Do not reheat it more than once after following the previous steps' : 'لا تقم بإعادة تسخينه أكثر من مرة بعد اتباع الخطوات السابقة'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatFoodPage;
