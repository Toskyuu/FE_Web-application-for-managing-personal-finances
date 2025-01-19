import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useModal} from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";
import {useToast} from "@/hooks/useToast.tsx";
import {updateUser} from "@/API/UserAPI.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";


interface FormData {
    email: string;
    username: string;
}

interface UserFormProps {
    id?: number;
    email?: string;
    username?: string;
}

const UserForm: React.FC<UserFormProps> = ({
                                               id,
                                               email,
                                               username
                                           }) => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormData>({
        defaultValues: {
            username: username || "",
            email: email || "",
        },
    });
    const {closeModal} = useModal();
    const {showToast} = useToast();
    const {forceRefresh} = useRefresh();


    useEffect(() => {
        if (id && username && email) {
            setValue("username", username);
            setValue("email", email);
        }
    }, [id, username, email, setValue]);

    const onSubmit = async (data: FormData) => {
        try {
            const response = await updateUser(data);
            showToast(response, "success");
            forceRefresh();
            closeModal();
        } catch (error) {
            showToast(`Wystąpił błąd. Spróbuj ponownie.`, "error");
        }
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
            label: "E-mail",
            type: "text",
            validation: {required: "E-mail jest wymagany"},
        },
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
                <FormField
                    key={field.id}
                    {...field}
                    register={register}
                    errors={errors}
                />
            ))}
            <div className="w-full flex justify-center items-center pt-5">
                <DefaultButton
                    fontSize="text-2xl"
                    color="text-text-dark"
                    bgColor="bg-success"
                    text={"Zapisz zmiany"}
                    padding="p-4"
                    radius="rounded-2xl"
                    minwidth="min-w-30"
                />
            </div>
        </form>
    );
};

export default UserForm;
