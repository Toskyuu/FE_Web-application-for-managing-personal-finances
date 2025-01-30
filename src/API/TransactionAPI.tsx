import apiClient from "@/lib/apiClient";

export const updateTransaction = async (id: number, data: any) => {
    try {
        const requestBody = {
            ...data,
            account_id_2: data.account_id_2 || null,
        };
        const response = await apiClient.patch(`/transactions/${id}`, requestBody);
        return {
            spentInBudget: response.data.spent_in_budget,
            recurringFrequency: response.data.recurring_frequency,
            message: "Transakcja została zaktualizowana."
        };
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas aktualizacji transakcji: ${error.response?.data?.message || error.message}`);
    }
};

export const addTransaction = async (data: any) => {
    try {
        const requestBody = {
            ...data,
            account_id_2: data.account_id_2 || null,
        };
        const response = await apiClient.post("/transactions", requestBody);

        return {
            spentInBudget: response.data.spent_in_budget,
            recurringFrequency: response.data.recurring_frequency,
            message: "Transakcja została dodana."
        };
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas dodawania transakcji: ${error.response?.data?.message || error.message}`);
    }
};

export const fetchTransactions = async (
    page: number,
    size: number,
    sortBy: string,
    order: "asc" | "desc",
    filters: any
) => {
    try {
        const response = await apiClient.post("/transactions/transactions", {
            page: page,
            size: size,
            sort_by: sortBy,
            order,
            ...filters
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            `Wystąpił błąd podczas pobierania transakcji: ${error.response?.data?.message || error.message}`
        );
    }
};

export const deleteTransaction = async (transactionId: number) => {
    try {
        await apiClient.delete(`/transactions/${transactionId}`);
        return "Transakcja została usunięta";
    } catch (error: any) {
        throw new Error(
            `Błąd podczas usuwania transakcji: ${error.response?.data?.message || error.message}`
        );
    }
};
