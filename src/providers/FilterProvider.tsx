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

interface BudgetFilterFormData {
    month_year: string | null;
    category_id: string[];

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
    budgetFilters: BudgetFilterFormData;
    setBudgetFilters: (filters: BudgetFilterFormData) => void;
    resetBudgetFilters: () => void;
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
            type: null,
        });
    };


    const [budgetFilters, setBudgetFilters] = useState<BudgetFilterFormData>({
        month_year: null,
        category_id: [],

    });
    const resetBudgetFilters = () => {
        setBudgetFilters({
            month_year: null,
            category_id: [],
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
            resetTransactionSummaryFilters,
            budgetFilters,
            setBudgetFilters,
            resetBudgetFilters
        }}>
            {children}
        </FilterContext.Provider>
    );
};


