import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useModal} from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";
import {translateAccountType} from "@/utils/Translators";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {addAccount, updateAccount} from "@/API/AccountAPI.tsx";
import {useData} from "@/hooks/useData.tsx";

interface AccountFormData {
    name: string;
    initial_balance: number;
    type: string;
}

interface AccountFormProps {

    id?: number;
    name?: string;
    initial_balance?: number;
    type?: string;
}

const AccountForm: React.FC<AccountFormProps> = ({id, name, initial_balance, type}) => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<AccountFormData>({
        defaultValues: {
            name: name || "",
            initial_balance: initial_balance || 0,
            type: type || "Cheking",
        },
    });
    const {showToast} = useToast();
    const {closeModal} = useModal();
    const {forceRefresh} = useRefresh();
    const {fetchData} = useData();

    const accountTypes = [
        {value: "Savings", label: translateAccountType("Savings")},
        {value: "Checking", label: translateAccountType("Checking")},
        {value: "Wallet", label: translateAccountType("Wallet")},
        {value: "Piggy", label: translateAccountType("Piggy")},
    ];

    const onSubmit = async (data: AccountFormData) => {
        try {
            let successMessage: string;

            if (id) {
                successMessage = await updateAccount(id, data, fetchData);
            } else {
                successMessage = await addAccount(data, fetchData);
            }
            showToast(successMessage, "success");
            forceRefresh();
            closeModal();
        } catch (error: any) {
            showToast(error.message, "error")
        }
    };

    const fields = [
        {
            id: "name",
            label: "Nazwa konta",
            type: "text",
            validation: {required: "Nazwa konta jest wymagana"},
        },
        {
            id: "initial_balance",
            label: "Saldo początkowe",
            type: "number",
            validation: {
                required: "Saldo początkowe jest wymagane",
                min: {value: 0, message: "Saldo nie może być mniejsze niż 0"},
            },
        },
        {
            id: "type",
            label: "Typ konta",
            type: "select",
            options: accountTypes,
            validation: {required: "Typ konta jest wymagany"},
        },
    ];

    useEffect(() => {
        if (id && name && initial_balance && type) {
            setValue("name", name);
            setValue("initial_balance", initial_balance);
            setValue("type", type);
        }
    }, [name, initial_balance, type, setValue]);

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
                    text={id ? "Zapisz zmiany" : "Dodaj konto"}
                    padding="p-4"
                    radius="rounded-2xl"
                    minwidth="min-w-30"
                />
            </div>
        </form>
    );
};

export default AccountForm;
