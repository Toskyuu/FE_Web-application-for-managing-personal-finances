import React from 'react';
import {AppRoutes} from "@/routes";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from '@/providers/AuthProvider'
import {DataProvider} from "@/providers/DataProvider.tsx";
import {FilterProvider} from "@/providers/FilterProvider.tsx";
import {ToastProvider} from "@/providers/ToastProvider.tsx";
import {useAuth} from "@/hooks/useAuth.tsx";
import {ModalWindow} from "@/components";
import {ModalProvider} from "@/providers/ModalProvider.tsx";

const App: React.FC = () => {
    const {isAuthenticated} = useAuth();

    return (
        <BrowserRouter>
            <ToastProvider>
                <DataProvider isAuthenticated={isAuthenticated}>
                    <AuthProvider>
                        <FilterProvider>
                            <ModalProvider>
                                <ModalWindow/>
                                <AppRoutes/>
                            </ModalProvider>
                        </FilterProvider>
                    </AuthProvider>
                </DataProvider>
            </ToastProvider>
        </BrowserRouter>
    );
};

export default App;
