import React from 'react';
import {ModalProvider} from '@/providers/ModalProvider';
import {RefreshProvider} from "@/providers/RefreshProvider.tsx";
import {ModalWindow} from '@/components';
import {FloatingButtons, Header} from "@/components";
import {Outlet} from 'react-router-dom';

const UserLayout: React.FC = () => {
    return (
        <RefreshProvider>

            <ModalProvider>
                <div
                    className="flex min-h-screen min-w-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark ">
                    <div className="flex-1 flex flex-col w-full">
                        <Header/>
                        <main className="p-5 flex flex-col items-center justify-center h-[calc(100vh-<header_height>)] ">
                            <div className="w-full m-auto ">
                                <Outlet/>
                            </div>
                        </main>
                    </div>
                    <FloatingButtons/>
                    <ModalWindow/>
                </div>
            </ModalProvider>
        </RefreshProvider>
    );
};

export default UserLayout;


