import React from 'react';
import {AppRoutes} from "@/routes";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from '@/providers/AuthProvider'
import {DataProvider} from "@/providers/DataProvider.tsx";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <DataProvider>
                <AuthProvider>
                    <AppRoutes/>
                </AuthProvider>
            </DataProvider>
        </BrowserRouter>

    )
        ;
};

export default App;
