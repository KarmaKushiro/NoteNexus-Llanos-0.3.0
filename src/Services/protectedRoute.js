import React from 'react';
import { Navigate } from 'react-router-dom';
import Parse from 'parse';

export const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = Parse.User.current() ? true : false;
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

