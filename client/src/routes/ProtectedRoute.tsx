import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useAuth';
import GNRL_TXT from '../constants/generalTxt.ts'


interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user: currentUser, loading } = useCurrentUser();

  if (loading) {
    return <div>{<p>{GNRL_TXT.LOADING}</p>}</div>;
  }

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
