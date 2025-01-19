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

export const resendConfirmation = async (
    email: string,
) => {
    try {
        const requestBody = {
            email
        };
        await apiClient.post("/users/request-verify-token", requestBody);
        return "Na twój mail wysłaliśmy link potwierdzający konto."
    } catch (error: any) {
        console.log(error);
        throw new Error(
            `Wystąpił błąd podczas wysyłania potwierdzenia na maila: ${error.response?.data?.message || error.message}`
        );
    }
};


export const resetPassword = async (
    email: string,
) => {
    try {
        const requestBody = {
            email
        };
        await apiClient.post("/users/forgot-password", requestBody);
        return "Na twojego maila wysłaliśmy link do resetowania hasła."
    } catch (error: any) {
        console.log(error);
        throw new Error(
            `Wystąpił błąd podczas wysyłania linku do resetowania hasła: ${error.response?.data?.message || error.message}`
        );
    }
};

export const updateUser = async (data: any) => {
    try {
        await apiClient.patch(`/users/me`, data);
        return "Twoje dane zostały zaktualizowane.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas aktualizacji danych: ${error.response?.data?.message || error.message}`);
    }
};

export const deleteUser = async () => {
    try {
        await apiClient.delete(`/users/me`);
        return "Twoje konto użytkownika zostało usunięte wraz ze wszystkimi danymi.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas usuwania konta użytkownika ${error.response?.data?.message || error.message}`);
    }
};