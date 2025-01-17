import apiClient from "@/lib/apiClient";

export const updateCategory = async (id: number, data: any, fetchData: () => void) => {
    try {
        await apiClient.put(`/categories/${id}`, data);
        fetchData();
        return "Kategoria została zaktualizowana.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas aktualizacji kategorii: ${error.response?.data?.message || error.message}`);
    }
};

export const addCategory = async (data: any, fetchData: () => void) => {
    try {
        await apiClient.post("/categories", data);
        fetchData();
        return "Kategoria została dodana.";
    } catch (error: any) {
        throw new Error(`Wystąpił błąd podczas dodawania kategorii: ${error.response?.data?.message || error.message}`);
    }
};

export const fetchCategories = async (
    sortBy: string,
    order: "asc" | "desc"
) => {
    try {
        const response = await apiClient.post("/categories/categories", {
            sort_by: sortBy,
            order,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            `Wystąpił błąd podczas pobierania kategorii: ${error.response?.data?.message || error.message}`
        );
    }
};

export const deleteCategory = async (categoryId: number, fetchData: () => void) => {
    try {
        await apiClient.delete(`/categories/${categoryId}`);
        fetchData();
        return "Kategoria została usunięta";
    } catch (error: any) {
        throw new Error(
            `Błąd podczas usuwania kategorii: ${error.response?.data?.message || error.message}`
        );
    }
};