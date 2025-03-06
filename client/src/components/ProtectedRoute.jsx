import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const loginTime = localStorage.getItem('loginTime');

  useEffect(() => {
    if (loginTime) {
      const parsedLoginTime = Number(loginTime); 
      if (Date.now() - parsedLoginTime > 43200000) { 
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        return <Navigate to="/login" />;
      }
    }
  }, [loginTime]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
