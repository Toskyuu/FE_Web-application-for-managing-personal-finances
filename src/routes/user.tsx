import {UserRouter} from "@/features/Auth/UserRouter.tsx";

export const userRoutes = [
    {
        path: '/*',
        element: <UserRouter />,
    },
];