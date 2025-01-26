import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useData } from "@/hooks/useData.tsx";
import { DefaultButton, FormField, CheckboxGroup } from "@/components";
import { useFilters } from "@/hooks/useFilters.tsx";
import { useModal } from "@/hooks/useModal.tsx";

interface FilterBudgetFormData {
    month_year: string | null;
    category_id: string[];
}

const FilterTransactionForm: React.FC = ({}) => {
    const { budgetFilters, setBudgetFilters, resetBudgetFilters } = useFilters();
    const { closeModal } = useModal();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FilterBudgetFormData>({
        defaultValues: budgetFilters,
    });
    const { categories } = useData();

    useEffect(() => {
        setValue("month_year", budgetFilters.month_year);
        setValue("category_id", budgetFilters.category_id);
    }, [budgetFilters, setValue]);

    const fields = [
        {
            id: "month_year",
            label: "Miesiąc budżetu",
            type: "month",
        },
    ];

    const onSubmit = (data: FilterBudgetFormData) => {
        setBudgetFilters(data);
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
                    onClick={() => {
                        resetBudgetFilters();
                        closeModal();
                    }}
                    padding="p-3"
                    radius="rounded-md"
                />
            </div>
        </form>
    );
};

export default FilterTransactionForm;
