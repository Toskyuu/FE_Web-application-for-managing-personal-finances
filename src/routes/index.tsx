import { useRoutes } from 'react-router-dom';

import { anonRoutes } from './anon';
import { userRoutes } from './user';
import LandingPage from "@/pages/Anon/LandingPage.tsx";

// import { useAuth } from '@/hooks/useAuth.ts';


export const AppRoutes = () => {
    // const { token } = useAuth();

    const commonRoutes = [
        { path: '/', element: <LandingPage /> },
        { path: '/*', element: <h1>404</h1> },
    ];

    const determineRoutes = () => {
        // if (!token) return anonRoutes;

        return userRoutes;
    };

    const routes = determineRoutes();

    return useRoutes([...routes, ...commonRoutes]);
}