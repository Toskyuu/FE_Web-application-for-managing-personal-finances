import React from 'react';
import LandingPage from "@/pages/Anon/LandingPage.tsx";
import LoginPage from "@/pages/Anon/LoginPage.tsx";
import {AppRoutes} from "@/routes";
import {BrowserRouter} from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>

    );
};

export default App;
