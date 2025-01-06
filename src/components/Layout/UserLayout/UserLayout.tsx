import React, {ReactNode} from 'react';
import {FloatingButtons, Header} from "@/components";

interface UserLayoutProps {
    children: ReactNode;
}


const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-full w-full min-h-screen min-w-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <div className="flex-1 flex flex-col">
                <Header/>
                <main className="flex-1 p-6 flex items-center justify-center">
                    {children}
                </main>
            </div>
            <FloatingButtons/>
        </div>

    );
};

export default UserLayout;
