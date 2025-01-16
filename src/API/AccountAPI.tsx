import apiClient from "@/lib/apiClient";
import {useData} from "@/hooks/useData.tsx";

const {fetchData} = useData();
export const updateAccount = async (id: number, data: any) => {
    try {
        await apiClient.put(`/accounts/${id}`, data);
        fetchData();
        return "Konto zostało zaktualizowane.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas aktualizacji konta: ${error.response?.data?.message || error.message}`);
    }
};

export const addAccount = async (data: any) => {
    try {
        await apiClient.post("/accounts", data);
        fetchData();
        return "Konto zostało dodane.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas dodawania konta: ${error.response?.data?.message || error.message}`);
    }
};

export const fetchAccounts = async (sortBy: string, order: "asc" | "desc") => {
    try {
        const response = await apiClient.post("/accounts/accounts", {
            sort_by: sortBy,
            order,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas pobierania kont:  ${error.response?.data?.message || error.message}`);
    }
};

export const deleteAccount = async (accountId: number) => {
    try {
        await apiClient.delete(`/accounts/${accountId}`);
        fetchData();
        return "Konto zostało usunięte";
    } catch (error: any) {
        throw new Error(`Błąd podczas usuwania konta: ${error.response?.data?.message || error.message}`);
    }
};

