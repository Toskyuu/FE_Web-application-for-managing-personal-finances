import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";
import {DefaultButton, MainCard} from "@/components";
import {useToast} from "@/hooks/useToast.tsx";
import {setNewPassword} from "@/API/UserAPI.tsx";

interface ResetPasswordPageProps {
    password: string;
    confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<ResetPasswordPageProps>();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const {showToast} = useToast();
    const navigate = useNavigate();


    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$/;
        if (!passwordRegex.test(password)) {
            return "Hasło musi mieć co najmniej 8 znaków, zawierać małą i wielką literę, cyfrę, znak specjalny oraz nie może zawierać spacji.";
        }
        return true;
    };

    const onSubmit: SubmitHandler<ResetPasswordPageProps> = async (data) => {
            if (!token) {
                showToast("Brak tokenu w URL!", "error");
                return;
            }
            try {
                const response = await setNewPassword(token, data.password);
                showToast(response, "success");
                navigate('/');
            } catch (error: any) {
                showToast(error.message, "error");

            }
        }
    ;

    const password = watch("password");

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <MainCard
                fontSize="text-xl"
                padding="p-10"
                height="h-auto"
                width="w-full max-w-md"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <h2 className="text-3xl font-semibold text-center mb-6">Zresetuj hasło</h2>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-md font-medium">
                            Nowe hasło
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "Hasło jest wymagane.",
                                validate: validatePassword
                            })}
                            className={`mt-1 p-2 block w-full border rounded-md text-text-light ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.password && <span className="text-md text-red-500">{errors.password.message}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-md font-medium">
                            Powtórz hasło
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register("confirmPassword", {
                                required: "Potwierdzenie hasła jest wymagane.",
                                validate: (value) =>
                                    value === password || "Hasła muszą być takie same."
                            })}
                            className={`mt-1 p-2 block w-full border rounded-md text-text-light ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.confirmPassword &&
                            <span className="text-md text-red-500">{errors.confirmPassword.message}</span>}
                    </div>

                    <DefaultButton
                        text="Zmień hasło"
                        onClick={handleSubmit(onSubmit)}
                        bgColor="bg-success"
                        color="text-text-dark"
                        padding="p-4"
                        radius="rounded-xl"
                        fontSize="text-2xl"
                        minwidth="w-full"
                    />
                </form>
            </MainCard>
        </div>
    );
};

export default ResetPasswordPage;
