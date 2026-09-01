import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './components/MenuPage';
import NutrientsPage from './components/NutrientsPage';

function App() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <Router>
      <div className={`app ${language === 'ar' ? 'rtl-layout' : ''}`}>
        <header className="main-header" style={{ position: 'relative' }}>
          <button 
            onClick={toggleLanguage} 
            className="language-toggle"
            style={{ 
              position: 'absolute', 
              right: '20px', 
              top: '20px', 
              padding: '6px 12px', 
              cursor: 'pointer', 
              borderRadius: '4px', 
              border: '2px solid #030986', 
              background: '#fff',
              color: '#030986',
              fontWeight: 'bold',
              zIndex: 10
            }}
          >
            {language === 'en' ? 'عربي' : 'English'}
          </button>
          <img src="/takamol%20logo%20.png" alt="Takamol Logo" className="logo" />
          <h1>{language === 'en' ? 'Takamol' : 'تكامل'}</h1>
        </header>
        <Routes>
          <Route path="/" element={<MenuPage language={language} />} />
          <Route path="/item/:id" element={<NutrientsPage language={language} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
