import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListPage from '../pages/ListPage';
import CreateStatePage from '../pages/CreateStatePage';
import StateForm from '../components/StateForm';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/state-form/:id?" element={<StateForm />} />
            <Route path="/" element={<ListPage />} />
            <Route path="/state-create" element={<CreateStatePage />} />
            <Route path="*" element={<p>not found</p>} />
        </Routes>
    );
};

export default AppRoutes;
