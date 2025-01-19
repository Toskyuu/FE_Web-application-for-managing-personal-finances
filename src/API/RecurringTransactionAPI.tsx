import apiClient from "@/lib/apiClient";

export const updateRecurringTransaction = async (id: number, data: any) => {
    try {
        const requestBody = {
            ...data,
            account_id_2: data.account_id_2 || null,
        };
        await apiClient.patch(`/recurring-transactions/${id}`, requestBody);
        return "Transakcja cykliczna została zaktualizowana.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas aktualizacji transakcji cyklicznej: ${error.response?.data?.message || error.message}`);
    }
};

export const addRecurringTransaction = async (data: any) => {
    try {
        const requestBody = {
            ...data,
            account_id_2: data.account_id_2 || null,
        };
        await apiClient.post("/recurring-transactions", requestBody);
        return "Transakcja cykliczna została dodana.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas dodawania transakcji cyklicznej: ${error.response?.data?.message || error.message}`);
    }
};


export const fetchRecurringTransactions = async (
    page: number,
    size: number,
    sortBy: string,
    order: "asc" | "desc"
) => {
    try {
        const response = await apiClient.post("/recurring-transactions/recurring-transactions", {
            page: page,
            size: size,
            sort_by: sortBy,
            order,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            `Wystąpił błąd podczas pobierania transakcji cyklicznych: ${error.response?.data?.message || error.message}`
        );
    }
};

export const deleteRecurringTransaction = async (recurringTransactionId: number) => {
    try {
        await apiClient.delete(`/recurring-transactions/${recurringTransactionId}`);
        return "Transakcja cykliczna została usunięta";
    } catch (error: any) {
        throw new Error(
            `Błąd podczas usuwania transakcji cyklicznej: ${error.response?.data?.message || error.message}`
        );
    }
};
