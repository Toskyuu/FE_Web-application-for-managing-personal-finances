import apiClient from "@/lib/apiClient.tsx";

export const fetchDashboard = async (
) => {
    try {
        const response = await apiClient.get("/dashboard/dashboard");
        return response.data;
    } catch (error: any) {
        throw new Error(
            `Wystąpił błąd podczas pobierania przeglądu: ${error.response?.data?.message || error.message}`
        );
    }
};