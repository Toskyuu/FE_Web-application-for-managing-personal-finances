import React, {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {useModal} from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";
import {useData} from "@/hooks/useData.tsx";
import {translateRecurringType, translateTransactionType} from "@/utils/Translators.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {addRecurringTransaction, updateRecurringTransaction} from "@/API/RecurringTransactionAPI.tsx";
import {useToast} from "@/hooks/useToast.tsx";

interface RecurringTransactionFormData {
    description: string;
    amount: number;
    recurring_frequency: string;
    start_date: string;
    category_id: number;
    account_id: number;
    account_id_2?: number;
    type: string;
    next_occurrence?: string;
}

interface RecurringTransactionFormProps {
    id?: number;
    description?: string;
    amount?: number;
    recurring_frequency?: string;
    start_date?: string;
    category_id?: number;
    category_name?: string;
    account_id?: number;
    account_name?: string;
    account_id_2?: number;
    account_2_name?: string;
    type?: string;
    next_occurrence?: string;
}

const RecurringTransactionForm: React.FC<RecurringTransactionFormProps> = ({
                                                                               id,
                                                                               description,
                                                                               amount,
                                                                               recurring_frequency,
                                                                               start_date,
                                                                               category_id,
                                                                               category_name,
                                                                               account_id,
                                                                               account_name,
                                                                               account_id_2,
                                                                               account_2_name,
                                                                               type,
                                                                               next_occurrence,
                                                                           }) => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<RecurringTransactionFormData>({
        defaultValues: {
            description: description || "",
            amount: amount || 0,
            recurring_frequency: recurring_frequency || "Monthly",
            start_date: start_date || new Date().toISOString().split("T")[0],
            category_id: category_id || undefined,
            account_id: account_id || undefined,
            type: type || "Income",
            account_id_2: account_id_2 || undefined,
            next_occurrence: next_occurrence || undefined,
        },
    });
    const {accounts, categories} = useData();
    const {closeModal} = useModal();
    const {forceRefresh} = useRefresh();
    const {showToast} = useToast();
    const [transactionType, setTransactionType] = useState<string>(type || "Income");

    const extendedCategories = useMemo(() => {
        const categoryExists = categories.some((cat: any) => cat.name === category_name);
        if (!categoryExists && category_id && category_name) {
            return [...categories, {id: category_id, name: category_name}];
        }
        return categories;
    }, [categories, category_id, category_name]);

    const extendedAccounts = useMemo(() => {
        const accountExists = (name: string | undefined, id: number | undefined) =>
            accounts.some((acc: any) => acc.name === name || acc.id === id);

        const newAccounts = [...accounts];

        if (!accountExists(account_name, account_id) && account_id && account_name) {
            newAccounts.push({id: account_id, name: account_name});
        }

        if (!accountExists(account_2_name, account_id_2) && account_id_2 && account_2_name) {
            newAccounts.push({id: account_id_2, name: account_2_name});
        }

        return newAccounts;
    }, [accounts, account_id, account_name, account_id_2, account_2_name]);


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

    useEffect(() => {
        if (id && description && amount && recurring_frequency && start_date && category_id && account_id && type && next_occurrence) {
            setValue("description", description);
            setValue("amount", amount);
            setValue("recurring_frequency", recurring_frequency);
            setValue("start_date", start_date);
            setValue("category_id", category_id);
            setValue("account_id", account_id);
            setValue("type", type);
            setValue("account_id_2", account_id_2 || undefined);
            setValue("next_occurrence", next_occurrence);
        }
    }, [id, description, amount, recurring_frequency, start_date, category_id, account_id, type, account_id_2, next_occurrence, setValue]);

    const onSubmit = async (data: RecurringTransactionFormData) => {
        try {
            let successMessage: string;

            if (id) {
                successMessage = await updateRecurringTransaction(id, data);
            } else {
                successMessage = await addRecurringTransaction(data);
            }

            showToast(successMessage, "success");
            forceRefresh();
            closeModal();
        } catch
            (error: any) {
            showToast(error.message, "error")
        }
    };

    const fields = [
        {
            id: "description",
            label: "Opis",
            type: "text",
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
            options: extendedCategories.map((category: any) => ({
                value: category.id,
                label: category.name,
            })),
            validation: {required: "Kategoria jest wymagana"},
        },
        {
            id: "account_id",
            label: "Konto",
            type: "select",
            options: extendedAccounts.map((account: any) => ({
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
            options: extendedAccounts.map((account: any) => ({
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
                    text={id ? "Zapisz zmiany" : "Dodaj cykliczną transakcję"}
                    padding="p-4"
                    radius="rounded-2xl"
                    minwidth="min-w-30"
                />
            </div>
        </form>
    );
};

export default RecurringTransactionForm;
