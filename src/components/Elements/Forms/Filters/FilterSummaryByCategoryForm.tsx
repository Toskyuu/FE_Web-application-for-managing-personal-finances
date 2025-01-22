import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useData} from "@/hooks/useData.tsx";
import {DefaultButton, FormField, CheckboxGroup} from "@/components";
import {translateTransactionType} from "@/utils/Translators.tsx";
import {useFilters} from "@/hooks/useFilters.tsx";
import {useModal} from "@/hooks/useModal.tsx";

interface FilterSummaryByCategoryFormData {
    date_from: string | null;
    date_to: string | null;
    account_id: string[];
    category_id: string[];
    type: string | null;
}


const FilterSummaryByCategoryForm: React.FC = ({}) => {
    const {transactionSummaryFilters, setTransactionSummaryFilters, resetTransactionSummaryFilters} = useFilters();
    const {closeModal} = useModal();

    const {register, control, handleSubmit, formState: {errors}, setValue} = useForm<FilterSummaryByCategoryFormData>({
        defaultValues: transactionSummaryFilters
    });
    const {accounts, categories} = useData();

    useEffect(() => {
        setValue("date_from", transactionSummaryFilters.date_from);
        setValue("date_to", transactionSummaryFilters.date_to);
        setValue("account_id", transactionSummaryFilters.account_id);
        setValue("category_id", transactionSummaryFilters.category_id);
        setValue("type", transactionSummaryFilters.type);
    }, [transactionSummaryFilters, setValue]);


    const TransactionTypes = [
        {value: "Income", label: translateTransactionType("Income")},
        {value: "Outcome", label: translateTransactionType("Outcome")},
    ];

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
            id: "type",
            label: "Typ transkacji",
            type: "select",
            options: TransactionTypes,

        },
    ];


    const onSubmit = (data: FilterSummaryByCategoryFormData) => {
        setTransactionSummaryFilters(data);
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
                    onClick={resetTransactionSummaryFilters}
                    padding="p-3"
                    radius="rounded-md"
                />
            </div>
        </form>
    );
};

export default FilterSummaryByCategoryForm;