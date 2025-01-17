import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useModal} from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";
import {useData} from "@/hooks/useData.tsx";
import {translateTransactionType} from "@/utils/Translators.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {addTransaction, updateTransaction} from "@/API/TransactionAPI.tsx";

interface FormData {
    description: string;
    amount: number;
    transaction_date: string;
    category_id: number;
    account_id: number;
    type: string;
    account_id_2?: number;
}

interface TransactionFormProps {
    id?: number;
    description?: string;
    amount?: number;
    transaction_date?: string;
    category_id?: number;
    account_id?: number;
    type?: string;
    account_id_2?: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
                                                             id,
                                                             description,
                                                             amount,
                                                             transaction_date,
                                                             category_id,
                                                             account_id,
                                                             type,
                                                             account_id_2,
                                                         }) => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormData>({
        defaultValues: {
            description: description || "",
            amount: amount || 0,
            transaction_date: transaction_date || new Date().toISOString().split("T")[0],
            category_id: category_id || undefined,
            account_id: account_id || undefined,
            type: type || "Income",
            account_id_2: account_id_2 || undefined,
        },
    });
    const {accounts, categories} = useData();
    const {closeModal} = useModal();
    const {forceRefresh} = useRefresh();
    const {showToast} = useToast();
    const [transactionType, setTransactionType] = useState<string>(type || "Income");

    const TransactionTypes = [
        {value: "Income", label: translateTransactionType("Income")},
        {value: "Outcome", label: translateTransactionType("Outcome")},
        {value: "Internal", label: translateTransactionType("Internal")},
    ];

    useEffect(() => {
        if (id && description && amount && transaction_date && category_id && account_id && type) {
            setValue("description", description);
            setValue("amount", amount);
            setValue("transaction_date", transaction_date);
            setValue("category_id", category_id);
            setValue("account_id", account_id);
            setValue("type", type);
            setValue("account_id_2", account_id_2 || undefined);
        }
    }, [id, description, amount, transaction_date, category_id, account_id, type, account_id_2, setValue]);

    const onSubmit = async (data: FormData) => {
        try {
            let successMessage: string;

            if (id) {
                successMessage = await updateTransaction(id, data);
            } else {
                successMessage = await addTransaction(data);
            }
            showToast(successMessage, "success");
            forceRefresh();
            closeModal();
        } catch (error) {
            showToast(`Wystąpił błąd. Spróbuj ponownie.`, "error");
        }
    };

    const fields = [
        {
            id: "description",
            label: "Opis",
            type: "text",
            validation: {required: "Opis jest wymagany"},
        },
        {
            id: "amount",
            label: "Kwota",
            type: "number",
            validation: {required: "Kwota jest wymagana", min: 0},
        },
        {
            id: "transaction_date",
            label: "Data",
            type: "date",
            validation: {required: "Data jest wymagana"},
        },
        {
            id: "category_id",
            label: "Kategoria",
            type: "select",
            options: categories.map((category: any) => ({
                value: category.id,
                label: category.name,
            })),
            validation: {required: "Kategoria jest wymagana"},
        },
        {
            id: "account_id",
            label: "Konto",
            type: "select",
            options: accounts.map((account: any) => ({
                value: account.id,
                label: account.name,
            })),
            validation: {required: "Konto jest wymagane"},
        },
        {
            id: "type",
            label: "Typ transakcji",
            type: "select",
            options: TransactionTypes,
            value: transactionType,
            onChange: (value: string) => {
                setTransactionType(value);
                setValue("type", value);
            },
        },
    ];

    if (transactionType === "Internal") {
        fields.push({
            id: "account_id_2",
            label: "Drugie konto",
            type: "select",
            options: accounts.map((account: any) => ({
                value: account.id,
                label: account.name,
            })),
            validation: {required: "Drugie konto jest wymagane"},
        });
    }

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
                    text={id ? "Zapisz zmiany" : "Dodaj transakcję"}
                    padding="p-4"
                    radius="rounded-2xl"
                    minwidth="min-w-30"
                />
            </div>
        </form>
    );
};

export default TransactionForm;
