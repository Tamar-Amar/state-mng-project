import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListPage from '../pages/ListPage';
import AuthPage from '../pages/AuthPage';
import StateForm from '../components/state/StateForm';
import PersonalPage from '../pages/PersonalPage';
import UsersPage from '../pages/UsersPage.tsx';
import PermissionsPage from '../pages/PermissionsPage.tsx';
import ProtectedRoute from './ProtectedRoute';
import { ERROR } from '../constants/componentsTxt.ts';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/login" element={<AuthPage />} />
        
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/permissions" element={<PermissionsPage />} />
        <Route path="/create-user" element={<AuthPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
        <Route path="/state-form/:id?" element={<StateForm />} />
        <Route path="/" element={<ListPage />} />
        <Route path="/personal" element={<PersonalPage />} />
      </Route>

      <Route path="*" element={<p>{ERROR.notFound}</p>} />
    </Routes>
  );
};

export default AppRoutes;
