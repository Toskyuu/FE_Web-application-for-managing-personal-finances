import React from 'react';
import {UserLayout} from "@/components";


const DashboardPage: React.FC = () => {
    return (
        <UserLayout>
            <div className={'bg-surface-light dark:bg-surface-dark p-48 content-center text-center dark:text-text-dark text-text-light rounded-2xl shadow-2xl'}>Witaj w swoim panelu użytkownika!</div>
        </UserLayout>
    );
};

export default DashboardPage;
