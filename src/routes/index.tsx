import { useRoutes } from 'react-router-dom';

import { anonRoutes } from './anon';
import { userRoutes } from './user';
import LandingPage from "@/pages/Anon/LandingPage.tsx";
import {AuthRouter} from "@/features/Auth/router.tsx";

// import { useAuth } from '@/hooks/useAuth.ts';


export const AppRoutes = () => {
    // const { token } = useAuth();

    const commonRoutes = [
        { path: '/', element: <LandingPage /> },
        { path: '/auth/*', element: <AuthRouter/>},
        { path: '/*', element: <h1>404</h1> },
    ];

    const determineRoutes = () => {
        // if (!token) return anonRoutes;

        return anonRoutes;
    };

    const routes = determineRoutes();

    return useRoutes([...routes, ...commonRoutes]);
}