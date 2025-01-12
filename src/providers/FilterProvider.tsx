import React, {createContext, ReactNode, useState} from 'react';

interface FilterFormData {
    date_from: string | null;
    date_to: string | null;
    min_amount: number | null;
    max_amount: number | null;
    account_id: string[];
    category_id: string[];
    type: string[];
}

interface FilterContextType {
    filters: FilterFormData;
    setFilters: (filters: FilterFormData) => void;
    resetFilters: () => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
    children: ReactNode;
}
export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [filters, setFilters] = useState<any>({
        date_from: null,
        date_to: null,
        min_amount: null,
        max_amount: null,
        account_id: [],
        category_id: [],
        type: [],
    });
    const resetFilters = () => {
        setFilters({});
    };

    return (
        <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>
            {children}
        </FilterContext.Provider>
    );
};


