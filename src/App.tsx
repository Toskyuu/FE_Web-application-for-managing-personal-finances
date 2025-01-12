import React from 'react';
import {AppRoutes} from "@/routes";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from '@/providers/AuthProvider'
import {DataProvider} from "@/providers/DataProvider.tsx";
import {FilterProvider} from "@/providers/FilterProvider.tsx";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <DataProvider>
                <AuthProvider>
                    <FilterProvider>
                        <AppRoutes/>
                    </FilterProvider>
                </AuthProvider>
            </DataProvider>
        </BrowserRouter>

    )
        ;
};

export default App;
