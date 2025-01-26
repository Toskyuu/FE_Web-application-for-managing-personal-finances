import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {DefaultButton, MainCard} from "@/components";
import {useAuth} from "@/hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import Loader from "@/components/Elements/Loader/Loader.tsx";

interface RegisterFormInputs {
    username: string;
    email: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    const {register: formRegister, handleSubmit, formState: {errors}} = useForm<RegisterFormInputs>();
    const {register} = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        setIsLoading(true);
        try {
            await register(data.username, data.email, data.password);
        } finally {
            setIsLoading(false);
        }
    };
    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$/;
        if (!passwordRegex.test(password)) {
            return "Hasło musi mieć co najmniej 8 znaków, zawierać małą i wielką literę, cyfrę, znak specjalny oraz nie może zawierać spacji.";
        }
        return true;
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <MainCard
                fontSize="text-xl"
                padding="p-10"
                height="h-auto"
                width="w-full max-w-md"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <h2 className="text-3xl font-semibold text-center mb-6">Rejestracja</h2>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-md font-medium">
                            Nazwa użytkownika
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...formRegister("username", {required: "Nazwa użytkownika nie może być pusta"})}
                            className={`mt-1 p-2 block w-full border rounded-md text-text-light ${errors.username ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.username && <span className="text-md text-red-500">{errors.username.message}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-md font-medium">
                            E-mail (Login)
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...formRegister("email", {required: "E-mail nie może być pusty"})}
                            className={`mt-1 p-2 block w-full border rounded-md text-text-light ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.email && <span className="text-md text-red-500">{errors.email.message}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-md font-medium text-gray-700">
                            Hasło
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...formRegister("password", {
                                required: "Hasło jest wymagane.",
                                validate: validatePassword
                            })}
                            className={`mt-1 p-2 block w-full border rounded-md text-text-light ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.password && <span className="text-md text-red-500">{errors.password.message}</span>}
                    </div>

                    <DefaultButton
                        text={isLoading ?
                            (<Loader/>) : ("Zarejestruj się")}
                        onClick={handleSubmit(onSubmit)}
                        bgColor="bg-success"
                        color="text-text-dark"
                        padding="p-4"
                        radius="rounded-xl"
                        fontSize="text-2xl"
                        minwidth="w-full"
                    />
                </form>

                <div className="mt-10 flex flex-col columns-1 justify-center gap-2">
                    <div>
                        Masz już konto?
                    </div>
                    <DefaultButton
                        text="Zaloguj się"
                        onClick={() => navigate("/login")}
                        bgColor="bg-secondary"
                        color="text-text-dark"
                        padding="p-2"
                        radius="rounded-xl"
                        fontSize="text-xl"
                        minwidth="w-2/3"
                    />
                </div>
            </MainCard>
        </div>
    );
};

export default RegisterForm;
