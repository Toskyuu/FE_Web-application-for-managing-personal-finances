import {UserRouter} from "@/routes/Routers/UserRouter.tsx";

export const userRoutes = [
    {
        path: '/*',
        element: <UserRouter />,
    },
];