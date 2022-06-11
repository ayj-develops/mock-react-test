import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClubsPage from '../pages/Clubs';
import Page404 from '../pages/Errors';
import Home from '../pages/Home';
import { AuthProvider } from './AuthContextProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
