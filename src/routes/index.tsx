import {useRoutes} from 'react-router-dom';

import {anonRoutes} from './anon';
import {userRoutes} from './user';
import {useAuth} from "@/hooks/useAuth.tsx";
import Error500Page from "@/pages/Error500Page.tsx";


export const AppRoutes = () => {
    const {isAuthenticated} = useAuth();

    const commonRoutes = [
        {path: '/500', element: <Error500Page/>},

    ];

    const determineRoutes = () => {
        if (isAuthenticated) return userRoutes;

        return anonRoutes;
    };

    const routes = determineRoutes();

    return useRoutes([...routes, ...commonRoutes]);
}