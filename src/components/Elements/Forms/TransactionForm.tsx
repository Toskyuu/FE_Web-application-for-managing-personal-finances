import React, {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {useModal} from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";
import {useData} from "@/hooks/useData.tsx";
import {translateTransactionType} from "@/utils/Translators.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {addTransaction, updateTransaction} from "@/API/TransactionAPI.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

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
    category_name?: string;
    account_id?: number;
    account_name?: string;
    type?: string;
    account_id_2?: number;
    account_2_name?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
                                                             id,
                                                             description,
                                                             amount,
                                                             transaction_date,
                                                             category_id,
                                                             category_name,
                                                             account_id,
                                                             account_name,
                                                             type,
                                                             account_id_2,
                                                             account_2_name
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
    const {closeModal, openModal} = useModal();
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

    const getBudgetNotification = async (budgetUsage: number) => {
        if (budgetUsage > 100) {
            return openModal(
                <div className="flex flex-col items-center justify-center p-4">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <div className="text-4xl text-error mb-2"><FontAwesomeIcon icon={faTriangleExclamation}/>️</div>
                        <div className="text-2xl font-bold">Przekroczono 100% budżetu!</div>
                    </div>
                    <p className="text-lg text-center">Ogranicz wydatki, aby uniknąć problemów finansowych.</p>
                </div>
            );

        }
        if (budgetUsage == 100) {
            return openModal(
                <div className="flex flex-col items-center justify-center p-4">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <div className="text-4xl text-error mb-2"><FontAwesomeIcon icon={faTriangleExclamation}/>️</div>
                        <div className="text-2xl font-bold">Osiągnięto 100% budżetu!</div>
                    </div>
                    <p className="text-lg text-center">Ogranicz wydatki, aby uniknąć problemów finansowych.</p>
                </div>
            );
        }
        if (budgetUsage >= 80) {
            return openModal(
                <div className="flex flex-col items-center justify-center p-4">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <div className="text-4xl text-error mb-2"><FontAwesomeIcon icon={faTriangleExclamation}/>️</div>
                        <div className="text-2xl font-bold">Osiągnięto 80% budżetu!</div>
                    </div>
                </div>
            );
        }
        if (budgetUsage >= 50) {
            return openModal(
                <div className="flex flex-col items-center justify-center p-4">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <div className="text-4xl text-error mb-2"><FontAwesomeIcon icon={faTriangleExclamation}/>️</div>
                        <div className="text-2xl font-bold">Osiągnięto 50% budżetu!</div>
                    </div>
                </div>
            );
        }
    }

    const onSubmit = async (data: FormData) => {
        try {
            let successMessage: { spentInBudget: number, message: string };

            if (id) {
                successMessage = await updateTransaction(id, data);
            } else {
                successMessage = await addTransaction(data);
            }
            showToast(successMessage.message, "success");
            forceRefresh();
            closeModal();
            getBudgetNotification(successMessage.spentInBudget)
        } catch (error: any) {
            showToast(error, "error");
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
            validation: {required: "Drugie konto jest wymagane, jeśli transakcja jest przelewem wewnętrznym"},
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
