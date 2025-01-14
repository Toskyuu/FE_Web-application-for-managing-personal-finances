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
                    className="flex h-full w-full min-h-screen min-w-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark ">
                    <div className="flex-1 flex flex-col">
                        <Header/>
                        <main className="p-6 flex flex-col items-center overflow-auto ">
                            <div className="w-full max-w-7xl">
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


