import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

const errorTranslations: { [key: string]: { [key: string]: string } } = {
    "400": {
        "LOGIN_BAD_CREDENTIALS": "Nieprawidłowe dane logowania.",
        "MISSING_FIELD": "Brak wymaganych danych.",
        "REGISTER_USER_ALREADY_EXISTS": "Na podany email jest już zarejestrowane konto. Spróbuj się zalogować.",
        "default": "Żądanie jest nieprawidłowe lub zawiera brakujące/niepoprawne dane.",
    },
    "404": {
        "default": "Nie znaleziono żądanego zasobu.",
    },
    "401": {
        "default": "Wymagana jest autentykacja, aby uzyskać dostęp do tego zasobu.",
    },
    "403": {
        "default": "Nie masz uprawnień do dostępu do tego zasobu.",
    },
    "500": {
        "default": "Na serwerze wystąpił nieoczekiwany błąd.",
    },
    "422": {
        "default": "Dostarczone dane są nieprawidłowe lub niekompletne.",
    },
    "409": {
        "default": "Wystąpił konflikt z bieżącym stanem zasobu.",
    },
    "503": {
        "default": "Usługa jest tymczasowo niedostępna. Spróbuj ponownie później.",
    },
};

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const statusCode = error.response.status.toString();
            const errorData = error.response.data.detail;

            if (errorTranslations[statusCode]) {
                error.response.data.message = errorTranslations[statusCode][errorData] ||
                    errorTranslations[statusCode]["default"];
            } else {
                error.response.data.message =
                    errorTranslations["default"] || error.message;
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
