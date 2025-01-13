import React, {createContext, useState, ReactNode} from "react";

interface RefreshContextType {
    forceRefresh: () => void;
    refreshKey: number;
}

export const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

interface RefreshProviderProps {
    children: ReactNode;
}

export const RefreshProvider: React.FC<RefreshProviderProps> = ({ children }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const forceRefresh = () => setRefreshKey(prev => prev + 1);

    return (
        <RefreshContext.Provider value={{ forceRefresh, refreshKey }}>
            {children}
        </RefreshContext.Provider>
    );
};

