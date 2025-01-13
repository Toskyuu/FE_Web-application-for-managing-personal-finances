import {useContext} from "react";
import {RefreshContext} from "@/providers/RefreshProvider.tsx";

export const useRefresh = () => {
    const context = useContext(RefreshContext);
    if (!context) {
        throw new Error("useRefresh must be used within a RefreshProvider");
    }
    return context;
};