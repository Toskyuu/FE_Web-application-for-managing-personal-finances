import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {DefaultButton, FormField, MainCard, ResetPasswordForm} from "@/components";
import {useAuth} from "@/hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import Loader from "@/components/Elements/Loader/Loader.tsx";
import {useModal} from "@/hooks/useModal.tsx";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const {register, handleSubmit, formState: {errors}, getValues} = useForm<LoginFormInputs>();
    const {logIn} = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {openModal} = useModal();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setIsLoading(true);
        try {
            await logIn(data.email, data.password);
        } finally {
            setIsLoading(false);
        }
    };


    const onResetPassword = () => {
        const email = getValues("email");
        openModal(<ResetPasswordForm email={email}/>);
    };

    const fields = [
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
            validation: {required: "Hasło jest wymagane"}
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
                            register={register}
                            errors={errors}
                        />
                    ))}

                    <DefaultButton
                        text={isLoading ? <Loader/> : "Zaloguj się"}
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
                        <div>
                            Nie masz jeszcze konta?
                        </div>
                        <DefaultButton
                            text="Zarejestruj się"
                            onClick={() => navigate("/register")}
                            bgColor="bg-secondary"
                            color="text-text-dark"
                            padding="p-2"
                            radius="rounded-xl"
                            fontSize="text-xl"
                            minwidth="w-full"
                        />
                    </div>
                    <div>
                        <div>
                            Zapomniałeś hasła?
                        </div>
                        <DefaultButton
                            text="Zresetuj hasło"
                            onClick={() => {
                                onResetPassword()
                            }}
                            bgColor="bg-secondary"
                            color="text-text-dark"
                            padding="p-2"
                            radius="rounded-xl"
                            fontSize="text-xl"
                            minwidth="w-full"
                        />
                    </div>
                </div>
            </MainCard>
        </div>
    )
        ;
};

export default LoginForm;
