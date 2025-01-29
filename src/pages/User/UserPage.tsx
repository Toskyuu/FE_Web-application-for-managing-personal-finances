import React, {useEffect, useState} from "react";
import {MainCard} from "@/components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useToast} from "@/hooks/useToast.tsx";
import {deleteUser, fetchUser, resendConfirmation, resetPassword} from "@/API/UserAPI.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import UserForm from "@/components/Elements/Forms/UserForm.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useAuth} from "@/hooks/useAuth.tsx";

interface User {
    id: number;
    username: string;
    email: string;
    is_verified: boolean;
}

const UserPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {showToast} = useToast();
    const {openModal, closeModal} = useModal();
    const {refreshKey, forceRefresh} = useRefresh();
    const {logOut} = useAuth();


    const loadUser = async () => {
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
    }, [refreshKey]);


    const onResetPassword = async (email: string) => {
        try {
            let response = await resetPassword(email);
            showToast(response, "success");
        } catch (error: any) {
            showToast(error.message, "error")
        }
    }

    const onResendConfirmation = async (email: string) => {
        try {
            let response = await resendConfirmation(email);
            showToast(response, "success");
        } catch (error: any) {
            showToast(error.message, "error")
        }
    }

    const onUpdateUserData = async (username: string, email: string) => {
        openModal(<UserForm username={username} email={email}/>)
    }

    const onDeleteUser = async () => {
        openModal(
            <div className="flex flex-col items-center  space-y-4">
                <h2 className="text-xl font-bold text-center">Czy na pewno chcesz usunąć swoje konto użytkownika?</h2>
                <h3 className="text-md text-center">Usunięte zostaną także twoje dane i nie będzie możliwości
                    ich przywrócenia.</h3>
                <div className="flex space-x-4">
                    <button
                        className="px-6 py-2 bg-error text-white rounded-lg hover:bg-error-dark"
                        onClick={async () => {
                            try {
                                let response = await deleteUser();
                                showToast(response, "success");
                                logOut();
                                forceRefresh();
                            } catch (error: any) {
                                showToast(error.message, "error")
                            } finally {
                                closeModal();
                            }
                        }}
                    >
                        Tak
                    </button>
                    <button
                        className="px-6 py-2 bg-success text-white rounded-lg hover:bg-success-dark"
                        onClick={closeModal}
                    >
                        Nie
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="flex flex-col items-center">

            <MainCard fontSize="text-lg" padding="p-6" height="h-auto" width="w-full sm:w-3/4 md:w-1/2">
                <div className="flex flex-col items-center">
                    <div className="mb-4">
                        <FontAwesomeIcon icon={faUser} className="text-6xl"/>
                    </div>

                    {user ? (
                        <div className="mb-4">
                            <h2 className="font-bold text-xl">{user.username}</h2>
                            <p className="text-gray-500">{user.email}</p>
                            <p className={`mt-2 ${user.is_verified ? "text-success" : "text-error"}`}>
                                {user.is_verified ? "Konto potwierdzone" : "Konto niepotwierdzone"}
                            </p>
                        </div>
                    ) : (
                        <p className="text-center">Brak danych użytkownika.</p>
                    )}

                    <div className="flex flex-col gap-4 md:w-1/2 lg:w-1/2">
                        {user?.is_verified && (
                            <button
                                onClick={() => onUpdateUserData(user.username, user.email)}
                                className="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-lg shadow-md transition-all"
                            >
                                Zmień swoje dane
                            </button>
                        )}
                        {!(user?.is_verified) && (
                            <button
                                onClick={() => onResendConfirmation(user!.email)}
                                className="bg-secondary hover:bg-primary text-white py-2 px-4 rounded-lg shadow-lg "
                            >
                                Wyślij ponownie maila z potwierdzeniem
                            </button>
                        )}
                        {user?.is_verified && (
                            <button
                                onClick={() => onResetPassword(user!.email)}
                                className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg shadow-lg"
                            >
                                Zresetuj hasło
                            </button>)}
                        <button
                            onClick={() => onDeleteUser()}
                            className="bg-error hover:bg-background-dark text-white py-2 px-4 rounded-lg shadow-lg"
                        >
                            Usuń konto
                        </button>
                    </div>
                    {isLoading && (
                        <p className="text-center">Ładowanie...</p>
                    )}
                </div>
            </MainCard>
        </div>
    );
};

export default UserPage;
