import {createContext, useState, ReactNode, useEffect} from "react";
import apiClient from "@/lib/apiClient.tsx";
import {useNavigate} from "react-router-dom";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {useToast} from "@/hooks/useToast.tsx";

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
    const {showToast} = useToast();

    const isTokenExpired = () => {
        if (!token) return false;

        try {
            const decoded = jwtDecode<JwtPayload>(token);

            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp ? decoded.exp > currentTime : false;
        } catch (error) {
            console.error("Invalid token", error);
            return false;
        }
    };

    useEffect(() => {
        if (token && !isTokenExpired()) {
            logOut();
        }
    }, [token]);


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

        } catch (error:any) {
            showToast(`Nie udało się zalogować: ${error.response?.data?.message || error.message }`, "error");
        }
    };

    const logOut = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        const interceptor = apiClient.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    logOut();
                    showToast('Token wygasł lub jest nieważny. Proszę zalogować się ponownie.', 'error');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            apiClient.interceptors.response.eject(interceptor);
        };
    }, [logOut, showToast]);


    const register = async (username: string, email: string, password: string) => {
        try {
            const formData = new FormData();
            formData.set("username", username);
            formData.set("email", email);
            formData.set("password", password);

            await apiClient.post(
                "/users/register",
                {
                    username,
                    email,
                    password
                }
            );

            navigate('/');
            showToast(`Udało się zarejestrować. Zaloguj się.`, "success");

        } catch (error: any) {
            showToast(`Nie udało się zarejestrować: ${error.response?.data?.message || error.message}`, "error");
        }
    };

    return (
        <AuthContext.Provider value={{token, logIn, logOut, register, isAuthenticated: !!token}}>
            {children}
        </AuthContext.Provider>
    );
};

