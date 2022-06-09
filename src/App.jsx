import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page404 from './pages/Errors';
import Home from './pages/Home';
import LoginPage from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
