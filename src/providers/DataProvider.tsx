import React, { createContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '@/lib/apiClient.tsx';

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

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const [accountsData, categoriesData] = await Promise.all([
                apiClient.post('/accounts/accounts',{}),
                apiClient.post('/categories/categories',{}),
            ]);

            setAccounts(accountsData.data);
            setCategories(categoriesData.data);
        } catch (error) {
            console.error('Błąd podczas pobierania danych', error);
        }
    };

    const clearData = () => {
        setAccounts([]);
        setCategories([]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ accounts, categories, fetchData, clearData }}>
            {children}
        </DataContext.Provider>
    );
};
