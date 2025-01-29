import React, {useEffect, useState} from "react";
import {DefaultButton, MainCard} from "@/components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useToast} from "@/hooks/useToast.tsx";
import {deleteUser, fetchUser, resendConfirmation, resetPassword} from "@/API/UserAPI.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import UserForm from "@/components/Elements/Forms/UserForm.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useAuth} from "@/hooks/useAuth.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";

interface User {
    id: number;
    username: string;
    email: string;
    is_verified: boolean;
}

const UserPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);  // Set initial loading state to true
    const {showToast} = useToast();
    const {openModal, closeModal} = useModal();
    const {refreshKey, forceRefresh} = useRefresh();
    const {logOut} = useAuth();

    const loadUser = async () => {
        setIsLoading(true);  // Set loading to true when the data is being fetched
        try {
            const data = await fetchUser();
            setUser(data);
        } catch (error: any) {
            showToast(error.message, "error");
        } finally {
            setIsLoading(false);  // Set loading to false after the data is fetched
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
            showToast(error.message, "error");
        }
    };

    const onResendConfirmation = async (email: string) => {
        try {
            let response = await resendConfirmation(email);
            showToast(response, "success");
        } catch (error: any) {
            showToast(error.message, "error");
        }
    };

    const onUpdateUserData = async (username: string, email: string) => {
        openModal(<UserForm username={username} email={email}/>);
    };

    const onDeleteUser = async () => {
        openModal(
            <div className="flex flex-col items-center space-y-4">
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
                                showToast(error.message, "error");
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
    };

    return (
        <div className="flex flex-col items-center">
            <MainCard fontSize="text-lg" padding="p-6" height="h-auto" width="w-full sm:w-3/4 md:w-1/2">
                <div className="flex flex-col items-center">
                    {isLoading ? (
                        <Loader/>
                    ) : user ? (
                        <>
                            <div className="mb-4">
                                <FontAwesomeIcon icon={faUser} className="text-6xl"/>
                            </div>


                            <div className="mb-4">
                                <h2 className="font-bold text-xl">{user.username}</h2>
                                <p className="text-gray-500">{user.email}</p>
                                <p className={`mt-2`}>
                                    {user.is_verified ? "Konto potwierdzone" : "Konto niepotwierdzone"}
                                </p>
                            </div>


                            <div className="flex flex-col gap-4 md:w-1/2 lg:w-1/2">
                                {user?.is_verified && (
                                    <DefaultButton
                                        onClick={() => onUpdateUserData(user.username, user.email)}
                                        text="Zmień swoje dane"
                                        bgColor="bg-secondary"
                                        color="text-text-dark"
                                        padding="py-2 px-6"
                                        radius="rounded-lg"
                                        fontSize=""
                                        minwidth="w-full"
                                    />
                                )}
                                {!(user?.is_verified) && (
                                    <DefaultButton
                                        onClick={() => onResendConfirmation(user!.email)}
                                        text="Wyślij ponownie maila z potwierdzeniem"
                                        bgColor="bg-secondary"
                                        color="text-text-dark"
                                        padding="py-2 px-6"
                                        radius="rounded-lg"
                                        fontSize=""
                                        minwidth="w-full"
                                    />
                                )}
                                {user?.is_verified && (
                                    <DefaultButton
                                        onClick={() => onResetPassword(user!.email)}
                                        text="Zresetuj hasło"
                                        bgColor="bg-secondary"
                                        color="text-text-dark"
                                        padding="py-2 px-6"
                                        radius="rounded-lg"
                                        fontSize=""
                                        minwidth="w-full"
                                    />
                                )}
                                <DefaultButton
                                    onClick={() => onDeleteUser()}
                                    text="Usuń konto"
                                    bgColor="bg-error"
                                    color="text-text-dark"
                                    padding="py-2 px-6"
                                    radius="rounded-lg"
                                    fontSize=""
                                    minwidth="w-full"
                                />
                            </div>
                        </>

                    ) : (
                        <p className="text-center">Brak danych użytkownika.</p>
                    )}
                </div>
            </MainCard>
        </div>
    );
};

export default UserPage;
