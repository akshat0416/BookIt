import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExperienceDetail from './pages/ExperienceDetail';
import Checkout from './pages/Checkout';
import BookingResult from './pages/BookingResult';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/booking-result" element={<BookingResult />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;