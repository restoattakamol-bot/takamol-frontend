import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './components/MenuPage';
import NutrientsPage from './components/NutrientsPage';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Takamol</h1>
          <p>Enjoy Your Meal</p>
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
