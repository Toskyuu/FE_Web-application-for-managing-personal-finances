import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DefaultButton, MainCard, FormField } from "@/components";
import { useAuth } from "@/hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Elements/Loader/Loader.tsx";

interface RegisterFormInputs {
    username: string;
    email: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
    const { register } = useAuth();
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

    const fields = [
        {
            id: "username",
            label: "Nazwa użytkownika",
            type: "text",
            validation: {required: "Nazwa użytkownika jest wymagana"},
        },
        {
            id: "email",
            label: "Email",
            type: "email",
            validation: {required: "Email jest wymagany"},
        },
        {
            id: "password",
            label: "Hasło",
            type: "password",
            validation: {required: "Hasło jest wymagane"}, validatePassword
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <MainCard
                fontSize="text-xl"
                padding="p-10"
                height="h-auto"
                width="w-full max-w-md"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                    <h2 className="text-3xl font-semibold text-center mb-6">Rejestracja</h2>

                    {fields.map((field) => (
                        <FormField
                            key={field.id}
                            {...field}
                            register={formRegister}
                            errors={errors}
                        />
                    ))}

                    <DefaultButton
                        text={isLoading ? <Loader /> : "Zarejestruj się"}
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
                    <div>Masz już konto?</div>
                    <DefaultButton
                        text="Zaloguj się"
                        onClick={() => navigate("/login")}
                        bgColor="bg-secondary"
                        color="text-text-dark"
                        padding="p-2"
                        radius="rounded-xl"
                        fontSize="text-xl"
                        minwidth="w-full"
                    />
                </div>
            </MainCard>
        </div>
    );
};

export default RegisterForm;
