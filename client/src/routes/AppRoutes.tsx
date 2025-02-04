import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListPage from '../pages/ListPage';
import AuthPage from '../pages/AuthPage';
import StateForm from '../components/state/StateForm';
import PersonalPage from '../pages/PersonalPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<ListPage />} />
            <Route path="/state-form/:id?" element={<StateForm />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="*" element={<p>not found</p>} />
        </Routes>
    );
};

export default AppRoutes;
