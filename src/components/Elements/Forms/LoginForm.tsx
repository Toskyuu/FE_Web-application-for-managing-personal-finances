import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {DefaultButton, MainCard} from "@/components";
import {loginRequest} from "@/lib/apiClient.tsx";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        await loginRequest(data.email, data.password);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <MainCard
                fontSize="text-xl"
                padding="p-10"
                height="h-auto"
                width="w-full max-w-md"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <h2 className="text-3xl font-semibold text-center mb-6">Logowanie</h2>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-md font-medium">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {required: "E-mail nie może być pusty"})}
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
                            {...register("password", {required: "Hasło nie może być puste"})}
                            className={`mt-1 p-2 block w-full border rounded-md text-text-light ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.password && <span className="text-md text-red-500">{errors.password.message}</span>}
                    </div>

                    <DefaultButton
                        text= "Zaloguj się"
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

export default LoginForm;
