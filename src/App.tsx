import React from 'react';
import {AppRoutes} from "@/routes";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from '@/providers/AuthProvider'
import {DataProvider} from "@/providers/DataProvider.tsx";
import {FilterProvider} from "@/providers/FilterProvider.tsx";
import {ToastProvider} from "@/providers/ToastProvider.tsx";
import {ModalWindow} from "@/components";
import {ModalProvider} from "@/providers/ModalProvider.tsx";
import {RefreshProvider} from "@/providers/RefreshProvider.tsx";

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <ToastProvider>
                <AuthProvider>
                    <DataProvider>
                        <RefreshProvider>
                            <FilterProvider>
                                <ModalProvider>
                                    <ModalWindow/>
                                    <AppRoutes/>
                                </ModalProvider>
                            </FilterProvider>
                        </RefreshProvider>
                    </DataProvider>
                </AuthProvider>
            </ToastProvider>
        </BrowserRouter>
    );
};

export default App;
