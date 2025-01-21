import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useData} from "@/hooks/useData";
import {DefaultButton, FormField, CheckboxGroup} from "@/components";
import {translateTransactionType} from "@/utils/Translators.tsx";
import {useFilters} from "@/hooks/useFilters.tsx";
import {useModal} from "@/hooks/useModal.tsx";

interface FilterTransactionOverTimeFormData {
    date_from: string | null;
    date_to: string | null;
    account_id: string[];
    category_id: string[];
    type: string[];
    interval: string
}


const FilterTransactionOverTimeForm: React.FC = ({}) => {
    const {transactionOverTimeFilters, setTransactionOverTimeFilters, resetTransactionOverTimeFilters} = useFilters();
    const {closeModal} = useModal();

    const {register, control, handleSubmit, formState: {errors}, setValue} = useForm<FilterTransactionOverTimeFormData>({
        defaultValues: transactionOverTimeFilters
    });
    const {accounts, categories} = useData();

    useEffect(() => {
        setValue("date_from", transactionOverTimeFilters.date_from);
        setValue("date_to", transactionOverTimeFilters.date_to);
        setValue("account_id", transactionOverTimeFilters.account_id);
        setValue("category_id", transactionOverTimeFilters.category_id);
        setValue("type", transactionOverTimeFilters.type);
        setValue("interval", transactionOverTimeFilters.interval);
    }, [transactionOverTimeFilters, setValue]);


    const Intervalypes = [
        {value: "Daily", label: "Dzienny"},
        {value: "Monthly", label: "Miesięczny"},
        {value: "Yearly", label: "Roczny"},
    ];

    const fields = [
        {
            id: "interval",
            label: "Czas interwału",
            type: "select",
            options: Intervalypes,
            validation: {required: "Czas interwału jest wymagany"},
        },
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
    ];
    const TransactionTypes = [
        {value: "Income", label: translateTransactionType("Income")},
        {value: "Outcome", label: translateTransactionType("Outcome")},
        {value: "Internal", label: translateTransactionType("Internal")},
    ];


    const onSubmit = (data: FilterTransactionOverTimeFormData) => {
        setTransactionOverTimeFilters(data);
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
            <CheckboxGroup
                id="interval"
                label="Czas interwału"
                options={Intervalypes}
                control={control}
                errors={errors}
            />

            <div className="w-full flex justify-center items-center pt-5 space-x-8">
                <DefaultButton
                    fontSize="text-lg"
                    color="text-white"
                    bgColor="bg-primary"
                    text="Zastosuj filtry"
                    padding="p-3"
                    radius="rounded-md"
                />
                <DefaultButton
                    fontSize="text-lg"
                    color="text-white"
                    bgColor="bg-primary"
                    text="Wyczyść filtry"
                    onClick={resetTransactionOverTimeFilters}
                    padding="p-3"
                    radius="rounded-md"
                />
            </div>
        </form>
    );
};

export default FilterTransactionOverTimeForm;