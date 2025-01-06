import { AuthRouter } from '@/features/Auth/router';

export const anonRoutes = [
    {
        path: '/auth/*',
        element: <AuthRouter />,
    },
];