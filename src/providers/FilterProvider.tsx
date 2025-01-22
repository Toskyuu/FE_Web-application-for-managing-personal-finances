import React, {createContext, ReactNode, useState} from 'react';

interface TransactionFilterFormData {
    date_from: string | null;
    date_to: string | null;
    min_amount: number | null;
    max_amount: number | null;
    account_id: string[];
    category_id: string[];
    type: string[];
}

interface TransactionOverTimeFilterFormData {
    date_from: string | null;
    date_to: string | null;
    account_id: string[];
    category_id: string[];
    type: string[];
    interval: string;

}

interface TransactionSummaryFormData {
    date_from: string | null;
    date_to: string | null;
    account_id: string[];
    category_id: string[];
    type: string | null;
}

interface FilterContextType {
    transactionFilters: TransactionFilterFormData;
    setTransactionFilters: (filters: TransactionFilterFormData) => void;
    resetTransactionFilters: () => void;
    transactionOverTimeFilters: TransactionOverTimeFilterFormData;
    setTransactionOverTimeFilters: (filters: TransactionOverTimeFilterFormData) => void;
    resetTransactionOverTimeFilters: () => void;
    transactionSummaryFilters: TransactionSummaryFormData;
    setTransactionSummaryFilters: (filters: TransactionSummaryFormData) => void;
    resetTransactionSummaryFilters: () => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({children}) => {
    const [transactionFilters, setTransactionFilters] = useState<TransactionFilterFormData>({
        date_from: null,
        date_to: null,
        min_amount: null,
        max_amount: null,
        account_id: [],
        category_id: [],
        type: [],
    });
    const resetTransactionFilters = () => {
        setTransactionFilters({
            date_from: null,
            date_to: null,
            min_amount: null,
            max_amount: null,
            account_id: [],
            category_id: [],
            type: [],
        });
    };
    const [transactionOverTimeFilters, setTransactionOverTimeFilters] = useState<TransactionOverTimeFilterFormData>({
        date_from: null,
        date_to: null,
        account_id: [],
        category_id: [],
        type: [],
        interval: "Daily"
    });
    const resetTransactionOverTimeFilters = () => {
        setTransactionOverTimeFilters({
            date_from: null,
            date_to: null,
            account_id: [],
            category_id: [],
            type: [],
            interval: "Daily"
        });
    };

    const [transactionSummaryFilters, setTransactionSummaryFilters] = useState<TransactionSummaryFormData>({
        date_from: null,
        date_to: null,
        account_id: [],
        category_id: [],
        type: null,
    });
    const resetTransactionSummaryFilters = () => {
        setTransactionSummaryFilters({
            date_from: null,
            date_to: null,
            account_id: [],
            category_id: [],
            type: "Income",
        });
    };

    return (
        <FilterContext.Provider value={{
            transactionFilters,
            setTransactionFilters,
            resetTransactionFilters,
            transactionOverTimeFilters,
            setTransactionOverTimeFilters,
            resetTransactionOverTimeFilters,
            transactionSummaryFilters,
            setTransactionSummaryFilters,
            resetTransactionSummaryFilters
        }}>
            {children}
        </FilterContext.Provider>
    );
};


