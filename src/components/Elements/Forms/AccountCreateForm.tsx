import React from "react";
import { useForm } from "react-hook-form";
import apiClient from "@/lib/apiClient.tsx";
import { useModal } from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";
import { translateAccountType } from "@/utils/Translators";

interface AccountFormData {
    name: string;
    initial_balance: number;
    type: string;
}

const AccountCreateForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AccountFormData>();
    const { closeModal } = useModal();

    const accountTypes = [
        { value: "Savings", label: translateAccountType("Savings") },
        { value: "Checking", label: translateAccountType("Checking") },
        { value: "Wallet", label: translateAccountType("Wallet") },
        { value: "Piggy", label: translateAccountType("Piggy") },
    ];

    const onSubmit = async (data: AccountFormData) => {
        try {
            const response = await apiClient.post("/accounts", data);
            console.log("Account successfully created:", response.data);
            closeModal();
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    const fields = [
        {
            id: "name",
            label: "Nazwa konta",
            type: "text",
            validation: { required: "Nazwa konta jest wymagana" },
        },
        {
            id: "initial_balance",
            label: "Saldo początkowe",
            type: "number",
            validation: {
                required: "Saldo początkowe jest wymagane",
                min: { value: 0, message: "Saldo nie może być mniejsze niż 0" },
            },
        },
        {
            id: "type",
            label: "Typ konta",
            type: "select",
            options: accountTypes,
            validation: { required: "Typ konta jest wymagany" },
        },
    ];

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
                    onClick={() => onSubmit}
                    text={"Dodaj konto"}
                    padding="p-4"
                    radius="rounded-2xl"
                    minwidth="min-w-30"
                />
            </div>
        </form>
    );
};

export default AccountCreateForm;
