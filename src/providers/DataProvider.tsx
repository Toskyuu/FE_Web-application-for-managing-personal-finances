import React, {createContext, useState, useEffect, ReactNode} from 'react';
import apiClient from '@/lib/apiClient.tsx';
import {useAuth} from "@/hooks/useAuth.tsx";

interface DataContextType {
    accounts: any[];
    categories: any[];
    fetchData: () => void;
    clearData: () => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({children}) => {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const {isAuthenticated} = useAuth();

    const fetchData = async () => {
        try {
            const [accountsData, categoriesData] = await Promise.all([
                apiClient.post('/accounts/accounts', {}),
                apiClient.post('/categories/categories', {}),
            ]);

            setAccounts(accountsData.data.accounts);
            setCategories(categoriesData.data.categories);
        } catch (error) {
            console.error('Błąd podczas pobierania danych', error);
        }
    };

    const clearData = () => {
        setAccounts([]);
        setCategories([]);
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        } else {
            clearData();
        }
    }, [isAuthenticated]);

    return (
        <DataContext.Provider value={{accounts, categories, fetchData, clearData}}>
            {children}
        </DataContext.Provider>
    );
};
