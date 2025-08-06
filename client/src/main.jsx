import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Dashboard from './pages/dashboard.jsx';
import Register from './pages/register'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import Design from './pages/design';
import Production from './pages/production';
import WeeklyReport from './pages/weekreport';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/design" 
          element={
            <ProtectedRoute>
              <Design />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/production" 
          element={
            <ProtectedRoute>
              <Production />
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/weekreport" 
          element={
            <ProtectedRoute>
              <WeeklyReport />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </Router>
  </React.StrictMode>
);
