import React, {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useModal} from "@/hooks/useModal.tsx";
import {resetPassword} from "@/API/UserAPI.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {DefaultButton, FormField} from "@/components";
import Loader from "@/components/Elements/Loader/Loader.tsx";

interface ResetPasswordFormInputs {
    email: string;
}

interface ResetPasswordFormProps {
    email: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({email}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<ResetPasswordFormInputs>({
        defaultValues: {
            email,
        },
    });
    const {closeModal} = useModal();
    const {showToast} = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
        setIsLoading(true);
        try {
            const response = await resetPassword(data.email);
            showToast(response, "success");
            closeModal();
        } catch (error: any) {
            showToast(error, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-6">Resetowanie Hasła</h2>

            <FormField
                id="email"
                label="E-mail"
                type="email"
                register={register}
                errors={errors}
                validation={{required: "E-mail nie może być pusty"}}
            />

            <DefaultButton
                text={isLoading ?
                    (<Loader/>) : ("Zresetuj hasło")}
                onClick={handleSubmit(onSubmit)}
                bgColor="bg-success"
                color="text-text-dark"
                padding="p-4"
                radius="rounded-xl"
                fontSize="text-2xl"
                minwidth="w-1/2"
            />
        </form>
    );
};

export default ResetPasswordForm;
