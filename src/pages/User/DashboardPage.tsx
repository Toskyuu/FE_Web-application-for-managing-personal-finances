import React from 'react';
import {MainCard, UserLayout} from "@/components";


const DashboardPage: React.FC = () => {
    return (
        <UserLayout>
            <MainCard fontSize='text-3xl' padding='p-24' height='min:h-20' width='min:w-20'>Hejka tu Lenka </MainCard>
        </UserLayout>
    );
};

export default DashboardPage;
