import React from 'react';
import {UserLayout} from "@/components";


const DashboardPage: React.FC = () => {
    return (
        <UserLayout>
            <h1>Witaj w swoim panelu użytkownika!</h1>
            {/* Można tu dodać dane użytkownika, saldo konta, transakcje itp. */}
        </UserLayout>
    );
};

export default DashboardPage;
