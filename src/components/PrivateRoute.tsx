import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return user && allowedRoles.includes(user.role) ? (
    children
  ) : (
    <Navigate to="/warning-access" />
  );
};

export default PrivateRoute;
