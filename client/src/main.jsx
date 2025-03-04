import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Production from './pages/production.jsx';
import Design from "./pages/design"; // Import the Design component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/production" element={<Production />} />
        <Route path="/design" element={<Design />} />

      </Routes>
    </Router>
  </React.StrictMode>
);
