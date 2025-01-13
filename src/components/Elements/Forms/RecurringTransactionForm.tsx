import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import apiClient from "@/lib/apiClient.tsx";
import {useData} from "@/hooks/useData.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";
import {translateRecurringType, translateTransactionType} from "@/utils/Translators.tsx";

interface RecurringTransactionFormData {
    description: string;
    amount: number;
    recurring_frequency: string;
    start_date: string;
    category_id: number;
    account_id: number;
    account_id_2?: number;
    type: string;
}

const RecurringTransactionForm: React.FC = () => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<RecurringTransactionFormData>();
    const [type, setType] = useState<string>("Income");
    const {accounts, categories} = useData();
    const {closeModal} = useModal();

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setValue("start_date", today);
    }, [setValue]);

    const onSubmit = async (data: RecurringTransactionFormData) => {
        try {
            const requestBody = {
                ...data,
                account_id_2: data.account_id_2 || null,
            };

            const response = await apiClient.post("/recurring-transactions", requestBody);

            console.log("Recurring transaction successfully created:", response.data);
            closeModal();
        } catch (error) {
            console.error("Error creating recurring transaction:", error);
        }
    };

    const RecurringTypes = [
        {value: "Daily", label: translateRecurringType("Daily")},
        {value: "Weekly", label: translateRecurringType("Weekly")},
        {value: "Biweekly", label: translateRecurringType("Biweekly")},
        {value: "Monthly", label: translateRecurringType("Monthly")},
    ];

    const TransactionTypes = [
        {value: "Income", label: translateTransactionType("Income")},
        {value: "Outcome", label: translateTransactionType("Outcome")},
        {value: "Internal", label: translateTransactionType("Internal")},
    ];


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
            id: "recurring_frequency",
            label: "Częstotliwość",
            type: "select",
            options: RecurringTypes,
            validation: {required: "Częstotliwość jest wymagana"},
        },
        {
            id: "start_date",
            label: "Data rozpoczęcia",
            type: "date",
            validation: {required: "Data rozpoczęcia jest wymagana"},
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
            value: type,
            onChange: (value: string) => {
                setType(value);
                setValue("type", value);
            },
        },
    ];

    if (type === "Internal") {
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
                    onClick={() => onSubmit}
                    text={"Dodaj cykliczną transakcję"}
                    padding="p-4"
                    radius="rounded-2xl"
                    minwidth="min-w-30"
                />
            </div>
        </form>
    );
};

export default RecurringTransactionForm;

