import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page404 from '../pages/Errors';
import Home from '../pages/Home';
import { UserAuthContextProvider } from './UserAuthContext';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
