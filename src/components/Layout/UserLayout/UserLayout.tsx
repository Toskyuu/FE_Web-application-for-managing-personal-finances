import React from 'react';
import {RefreshProvider} from "@/providers/RefreshProvider.tsx";
import {FloatingButtons, Header} from "@/components";
import {Outlet} from 'react-router-dom';

const UserLayout: React.FC = () => {
    return (
        <RefreshProvider>

            <div
                className="flex min-h-screen min-w-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark ">
                <div className="flex-1 flex flex-col w-full">
                    <Header/>
                    <main className="p-5 flex flex-col items-center justify-center h-[calc(100vh-<header_height>)] ">
                        <div className="w-full m-auto pb-20  ">
                            <Outlet/>
                        </div>
                    </main>
                </div>
                <FloatingButtons/>
            </div>
        </RefreshProvider>
    );
};

export default UserLayout;


