import React from "react";
import { useForm } from "react-hook-form";
import apiClient from "@/lib/apiClient.tsx";
import { useData } from "@/hooks/useData.tsx";
import { useModal } from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";

interface BudgetFormData {
    category_id: number;
    limit: number;
    month: string;
}

const BudgetCreateForm: React.FC = () => {
    const { register, handleSubmit,  formState: { errors } } = useForm<BudgetFormData>();
    const { categories } = useData();
    const { closeModal } = useModal();

    const onSubmit = async (data: BudgetFormData) => {
        try {
            const [month, year] = data.month.split("-");
            const formattedDate = `${year}-${month}-01`;

            const requestBody = {
                category_id: data.category_id,
                limit: data.limit,
                month: formattedDate,
            };

            const response = await apiClient.post("/budgets", requestBody);
            console.log("Budget successfully created:", response.data);
            closeModal();
        } catch (error) {
            console.error("Error creating budget:", error);
        }
    };

    const fields = [
        {
            id: "category_id",
            label: "Kategoria",
            type: "select",
            options: categories.map((category: any) => ({
                value: category.id,
                label: category.name,
            })),
            validation: { required: "Kategoria jest wymagana" },
        },
        {
            id: "limit",
            label: "Limit budżetu",
            type: "number",
            validation: {
                required: "Limit budżetu jest wymagany",
                min: { value: 0, message: "Limit nie może być mniejszy niż 0" },
            },
        },
        {
            id: "month",
            label: "Miesiąc obowiązywania",
            type: "month",
            validation: { required: "Miesiąc obowiązywania jest wymagany" },
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
                    text={"Dodaj budżet"}
                    padding="p-4"
                    radius="rounded-2xl"
                    minwidth="min-w-30"
                />
            </div>
        </form>
    );
};

export default BudgetCreateForm;
