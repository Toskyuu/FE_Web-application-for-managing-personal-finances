import React, {ReactNode} from 'react';
import {AnonHeader} from "@/components";

interface AnonLayoutProps {
    children: ReactNode;
}

const AnonLayout: React.FC<AnonLayoutProps> = ({children}) => {
    return (
        <div
            className="flex h-full w-full min-h-screen min-w-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <div className="flex-1 flex flex-col">
                <AnonHeader/>
                {children}
            </div>
        </div>

    );
};

export default AnonLayout;
