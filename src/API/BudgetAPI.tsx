import apiClient from "@/lib/apiClient";


export const updateBudget = async (id: number, data: any) => {
    try {
        await apiClient.patch(`/budgets/${id}`, data);
        return "Budżet został zaktualizowany.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas aktualizacji budżetu: ${error.response?.data?.message || error.message}`);
    }
};

export const addBudget = async (requestBody: any) => {
    try {
        await apiClient.post(`/budgets`, requestBody);
        return "Budżet został dodany.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas dodawania budżetu: ${error.response?.data?.message || error.message}`);
    }
};

export const fetchBudgets = async (
    page: number,
    size: number,
    sortBy: string,
    order: "asc" | "desc"
) => {
    try {
        const response = await apiClient.post("/budgets/budgets", {
            page: page,
            size: size,
            sort_by: sortBy,
            order,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            `Wystąpił błąd podczas pobierania budżetów: ${error.response?.data?.message || error.message}`
        );
    }
};

export const deleteBudget = async (budgetId: number) => {
    try {
        await apiClient.delete(`/budgets/${budgetId}`);
        return "Budżet został usunięty";
    } catch (error: any) {
        throw new Error(
            `Błąd podczas usuwania budżetu: ${error.response?.data?.message || error.message}`
        );
    }
};
