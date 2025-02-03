import React from 'react';
import {AppRoutes} from "@/routes";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from '@/providers/AuthProvider'
import {DataProvider} from "@/providers/DataProvider.tsx";
import {FilterProvider} from "@/providers/FilterProvider.tsx";
import {ToastProvider} from "@/providers/ToastProvider.tsx";
import {Header, ModalWindow} from "@/components";
import {ModalProvider} from "@/providers/ModalProvider.tsx";
import {RefreshProvider} from "@/providers/RefreshProvider.tsx";
import {HelmetProvider} from "react-helmet-async";

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <HelmetProvider>
                <ToastProvider>
                    <AuthProvider>
                        <DataProvider>
                            <RefreshProvider>
                                <FilterProvider>
                                    <ModalProvider>
                                        <Header/>
                                        <ModalWindow/>
                                        <AppRoutes/>
                                    </ModalProvider>
                                </FilterProvider>
                            </RefreshProvider>
                        </DataProvider>
                    </AuthProvider>
                </ToastProvider>
            </HelmetProvider>
        </BrowserRouter>
    );
};

export default App;
