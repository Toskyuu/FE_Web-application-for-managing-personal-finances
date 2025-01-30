import { AnonRouter } from '@/routes/Routers/AnonRouter.tsx';

export const anonRoutes = [
    {
        path: '/*',
        element: <AnonRouter />,
    },
];