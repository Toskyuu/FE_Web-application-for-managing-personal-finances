import { AuthRouter } from '@/features/Auth/AuthRouter';

export const anonRoutes = [
    {
        path: '/*',
        element: <AuthRouter />,
    },
];