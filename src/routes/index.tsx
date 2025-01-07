import { useRoutes } from 'react-router-dom';

import { anonRoutes } from './anon';
import { userRoutes } from './user';
import {useAuth} from "@/hooks/useAuth.tsx";


export const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    const commonRoutes = [
        { path: '/*', element: <h1>404</h1> },
    ];

    const determineRoutes = () => {
         if (!isAuthenticated) return anonRoutes;

         console.log("Jesteś zalogowany.")
        return anonRoutes;
    };

    const routes = determineRoutes();

    return useRoutes([...routes, ...commonRoutes]);
}