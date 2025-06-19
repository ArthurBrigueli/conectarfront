import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthUser';
import type { JSX } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: 'admin' | 'user';
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/403" />;
  }

  return children;
};

export default PrivateRoute;
