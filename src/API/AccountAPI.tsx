import apiClient from "@/lib/apiClient";

export const updateAccount = async (id: number, data: any, fetchData: () => void) => {
    try {
        await apiClient.patch(`/accounts/${id}`, data);
        fetchData();
        return "Konto zostało zaktualizowane.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas aktualizacji konta: ${error.response?.data?.message || error.message}`);
    }
};

export const addAccount = async (data: any, fetchData: () => void) => {
    try {
        await apiClient.post("/accounts", data);
        fetchData();
        return "Konto zostało dodane.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas dodawania konta: ${error.response?.data?.message || error.message}`);
    }
};

export const fetchAccounts = async (page: number, size: number, sortBy: string, order: "asc" | "desc") => {
    try {
        const response = await apiClient.post("/accounts/accounts", {
            page: page,
            size: size,
            sort_by: sortBy,
            order,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas pobierania kont:  ${error.response?.data?.message || error.message}`);
    }
};

export const deleteAccount = async (accountId: number, fetchData: () => void) => {
    try {
        await apiClient.delete(`/accounts/${accountId}`);
        fetchData();
        return "Konto zostało usunięte";
    } catch (error: any) {
        throw new Error(`Błąd podczas usuwania konta: ${error.response?.data?.message || error.message}`);
    }
};

