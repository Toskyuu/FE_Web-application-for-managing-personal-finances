import React, {useEffect, useState} from "react";
import {MainCard} from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {useToast} from "@/hooks/useToast.tsx";
import {fetchUser} from "@/API/UserAPI.tsx";

interface User {
    username: string;
    email: string;
    isConfirmed: boolean;
}

const UserPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {showToast} = useToast();



    const loadUser = async (
    ) => {
        setIsLoading(true);
        try {
            const data = await fetchUser();
            setUser(data);
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);


    const onResetPassword = async () => {

    }

    const onResendConfirmation = async () => {

    }

    return (
        <MainCard fontSize="text-lg" padding="p-6" height="h-auto" width="w-auto">
            <div className="mb-4">
                <FontAwesomeIcon icon={faUser} className="text-6xl" />
            </div>

            {user ? (
                <div className="mb-4">
                    <h2 className="font-bold text-xl">{user.username}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <p className={`mt-2 ${user.isConfirmed ? "text-success" : "text-error"}`}>
                        {user.isConfirmed ? "Konto potwierdzone" : "Konto niepotwierdzone"}
                    </p>
                </div>
            ) : (
                <p className="text-center">Brak danych użytkownika.</p>
            )}

            <div className="flex flex-col gap-4">
                <button
                    onClick={onResetPassword}
                    className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg shadow-md transition-all"
                >
                    Zmień hasło hasło
                </button>
                <button
                    onClick={onResendConfirmation}
                    className="bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded-lg shadow-md transition-all"
                >
                    Wyślij ponownie maila z potwierdzeniem
                </button>
            </div>
            {isLoading ? (
                <p className="text-center">Ładowanie...</p>
            ): null}
        </MainCard>
    );
};

export default UserPage;
