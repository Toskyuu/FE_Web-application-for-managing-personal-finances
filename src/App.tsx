import React from 'react';
import {AppRoutes} from "@/routes";
import {BrowserRouter} from "react-router-dom";
import AuthProvider from '@/providers/AuthProvider'


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
            <AppRoutes />
            </AuthProvider>
        </BrowserRouter>

    );
};

export default App;
