import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useData} from "@/hooks/useData.tsx";
import {DefaultButton, FormField, CheckboxGroup} from "@/components";
import {translateTransactionType} from "@/utils/Translators.tsx";
import {useFilters} from "@/hooks/useFilters.tsx";
import {useModal} from "@/hooks/useModal.tsx";

interface FilterTransactionFormData {
    date_from: string | null;
    date_to: string | null;
    min_amount: number | null;
    max_amount: number | null;
    account_id: string[];
    category_id: string[];
    type: string[];
}


const FilterTransactionForm: React.FC = ({}) => {
    const {transactionFilters, setTransactionFilters, resetTransactionFilters} = useFilters();
    const {closeModal} = useModal();

    const {register, control, handleSubmit, formState: {errors}, setValue} = useForm<FilterTransactionFormData>({
        defaultValues: transactionFilters
    });
    const {accounts, categories} = useData();

    useEffect(() => {
        setValue("date_from", transactionFilters.date_from);
        setValue("date_to", transactionFilters.date_to);
        setValue("min_amount", transactionFilters.min_amount);
        setValue("max_amount", transactionFilters.max_amount);
        setValue("account_id", transactionFilters.account_id);
        setValue("category_id", transactionFilters.category_id);
        setValue("type", transactionFilters.type);
    }, [transactionFilters, setValue]);

    const fields = [
        {
            id: "date_from",
            label: "Data początkowa",
            type: "date",
        },
        {
            id: "date_to",
            label: "Data końcowa",
            type: "date",
        },
        {
            id: "min_amount",
            label: "Kwota minimalna",
            type: "number",
            step: "0.01",
        },
        {
            id: "max_amount",
            label: "Kwota maksymalna",
            type: "number",
            step: "0.01",
        }
    ];
    const TransactionTypes = [
        {value: "Income", label: translateTransactionType("Income")},
        {value: "Outcome", label: translateTransactionType("Outcome")},
        {value: "Internal", label: translateTransactionType("Internal")},
    ];

    const onSubmit = (data: FilterTransactionFormData) => {
        setTransactionFilters(data);
        closeModal();
    };


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

            <CheckboxGroup
                id="account_id"
                label="Konta"
                options={accounts.map((account: any) => ({
                    value: account.id.toString(),
                    label: account.name,
                }))}
                control={control}
                errors={errors}
            />

            <CheckboxGroup
                id="category_id"
                label="Kategorie"
                options={categories.map((category: any) => ({
                    value: category.id.toString(),
                    label: category.name,
                }))}
                control={control}
                errors={errors}
            />
            <CheckboxGroup
                id="type"
                label="Typy transakcji"
                options={TransactionTypes}
                control={control}
                errors={errors}
            />

            <div className="w-full flex justify-center items-center pt-5 space-x-8">
                <DefaultButton
                    fontSize="text-lg"
                    color="text-text-dark"
                    bgColor="bg-secondary"
                    text="Zastosuj filtry"
                    padding="p-3"
                    radius="rounded-md"
                />
                <DefaultButton
                    fontSize="text-lg"
                    color="text-text-dark"
                    bgColor="bg-secondary"
                    text="Wyczyść filtry"
                    onClick={resetTransactionFilters}
                    padding="p-3"
                    radius="rounded-md"
                />
            </div>
        </form>
    );
};

export default FilterTransactionForm;