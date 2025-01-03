import React, {ReactNode} from 'react';
import {FloatingButtons, Header} from "@/components";

interface UserLayoutProps {
    children: ReactNode;
}


const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6">{children}</main>
                <FloatingButtons />
            </div>
        </div>
    );
};

export default UserLayout;
