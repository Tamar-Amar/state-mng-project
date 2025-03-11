import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useAuth';
import { LABELS } from '../constants/componentsTxt';


interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user: currentUser, loading } = useCurrentUser();

  if (loading) {
    return <div>{<p>{LABELS.loading}</p>}</div>;
  }

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
