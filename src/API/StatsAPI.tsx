import apiClient from "@/lib/apiClient";

export const fetchSummaryByTime = async (filters: any
) => {
    try {
        const response = await apiClient.post("/stats/summary-by-time", {
            ...filters
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas pobierania statystyk: ${error.response?.data?.message || error.message}`);
    }
};

export const fetchSummaryByCategory = async (filters: any
) => {
    try {
        const response = await apiClient.post("/stats/summary-by-category", {
            ...filters
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas pobierania statystyk: ${error.response?.data?.message || error.message}`);
    }
};

export const fetchSummary = async (filters: any
) => {
    try {
        const response = await apiClient.post("/stats/summary", {
            ...filters
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas pobierania statystyk: ${error.response?.data?.message || error.message}`);
    }
};

export const fetchCumulative = async (filters: any
) => {
    try {
        const response = await apiClient.post("/stats/cumulative", {
            ...filters
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas pobierania statystyk: ${error.response?.data?.message || error.message}`);
    }
};


