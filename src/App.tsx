import React from 'react';
import {AppRoutes} from "@/routes";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from '@/providers/AuthProvider'
import {DataProvider} from "@/providers/DataProvider.tsx";
import {FilterProvider} from "@/providers/FilterProvider.tsx";
import {ToastProvider} from "@/providers/ToastProvider.tsx";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ToastProvider>
                <DataProvider>
                    <AuthProvider>
                        <FilterProvider>
                            <AppRoutes/>
                        </FilterProvider>
                    </AuthProvider>
                </DataProvider>
            </ToastProvider>
        </BrowserRouter>

    )
        ;
};

export default App;
