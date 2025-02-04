import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListPage from '../pages/ListPage';
import AuthPage from '../pages/AuthPage';
import StateForm from '../components/state/StateForm';
import PersonalPage from '../pages/PersonalPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/state-form/:id?" element={<StateForm />} />
            <Route path="/" element={<AuthPage />} />
            <Route path="/states-list" element={<ListPage />} />
            <Route path="*" element={<p>not found</p>} />
            <Route path="/personal" element={<PersonalPage />} />
        </Routes>
    );
};

export default AppRoutes;
