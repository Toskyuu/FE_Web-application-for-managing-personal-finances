import apiClient from "@/lib/apiClient";

export const fetchUser = async () => {
    try {
        const response = await apiClient.get("/users/me");
        return response.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(
            `Wystąpił błąd podczas pobierania danych użytkownika: ${error.response?.data?.message || error.message}`
        );
    }
};