import { createContext, useState, ReactNode } from "react";
import apiClient from "@/lib/apiClient.tsx";
import {useNavigate} from "react-router-dom";

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    login: async () => {},
    logout: () => {},
    isAuthenticated: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const formData = new FormData();
            formData.set("username", email);
            formData.set("password", password);

            const response = await apiClient.post("/users/login", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const userToken = response.data.access_token;
            setToken(userToken);
            localStorage.setItem("token", userToken);
            navigate('/');
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;