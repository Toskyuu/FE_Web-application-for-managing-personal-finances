import apiClient from "@/lib/apiClient";

export const fetchTransactionsOverTime = async (filters: any
) => {
    try {
        const response = await apiClient.post("/stats/transactions-over-time", {
            ...filters
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas pobierania statystyk: ${error.response?.data?.message || error.message}`);
    }
};

