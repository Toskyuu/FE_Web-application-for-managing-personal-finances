import {createContext, useState, ReactNode} from "react";
import apiClient from "@/lib/apiClient.tsx";
import {useNavigate} from "react-router-dom";

interface AuthContextType {
    token: string | null;
    logIn: (email: string, password: string) => Promise<void>;
    logOut: () => void;
    register: (username: string, email: string, password: string) => Promise<void>;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    logIn: async () => {
    },
    logOut: () => {
    },
    register: async () => {
    },
    isAuthenticated: false,
});

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const navigate = useNavigate();

    const logIn = async (email: string, password: string) => {
        try {
            const formData = new FormData();
            formData.set("username", email);
            formData.set("password", password);

            const response = await apiClient.post("/users/login", formData, {
                headers: {"Content-Type": "multipart/form-data"},
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

    const logOut = () => {
        setToken(null);
        localStorage.removeItem("token");
        console.log("Wylogowano usera")
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const formData = new FormData();
            formData.set("username", username);
            formData.set("email", email);
            formData.set("password", password);

            const response = await apiClient.post(
                "/users/register",
                {
                    username,
                    email,
                    password
                }
            );

            console.log(response);
            navigate('/');
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{token, logIn, logOut, register, isAuthenticated: !!token}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;