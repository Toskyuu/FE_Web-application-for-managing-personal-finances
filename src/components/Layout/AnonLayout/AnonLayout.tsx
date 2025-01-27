import React, {ReactNode} from 'react';
import {AnonHeader} from "@/components";
import {Outlet} from "react-router-dom";

interface AnonLayoutProps {
    children?: ReactNode;
}

const AnonLayout: React.FC<AnonLayoutProps> = ({}) => {
    return (
        <div
            className="flex h-full w-full min-h-screen min-w-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <div className="flex-1 flex flex-col">
                <AnonHeader/>
                <main className="p-5 flex flex-col items-center justify-center h-full">
                    <div className="w-full m-auto ">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </div>

    );
};

export default AnonLayout;
