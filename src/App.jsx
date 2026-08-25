import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './components/MenuPage';
import NutrientsPage from './components/NutrientsPage';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="main-header">
          <img src="/takamol%20logo%20.png" alt="Takamol Logo" className="logo" />
          <h1>Takamol</h1>
        </header>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/item/:id" element={<NutrientsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
