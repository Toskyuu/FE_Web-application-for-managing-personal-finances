import React from 'react';
import {AccountCard} from "@/components";
import {TransactionCard} from "@/components";


const DashboardPage: React.FC = () => {
    return (
        <div className="flex flex-wrap justify-center gap-4 w-full">
            <div className="w-full lg:w-1/4">
                <AccountCard/>
            </div>
            <div className="w-full lg:w-1/4">
                <TransactionCard/>
            </div>
            <div className="w-full lg:w-1/4">
                <div className="p-4 border rounded-lg">Dodatkowy obiekt</div>
            </div>
        </div>

    )
        ;
};

export default DashboardPage;
