import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useData} from "@/hooks/useData.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {addBudget, updateBudget} from "@/API/BudgetAPI.tsx";

interface BudgetFormData {
    category_id: number;
    limit: number;
    month_year: string;
}

interface BudgetFormProps {
    id?: number;
    category_id?: number;
    limit?: number;
    month_year?: string;
}

const BudgetForm: React.FC<BudgetFormProps> = ({id, category_id, limit, month_year}) => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<BudgetFormData>({
        defaultValues: {
            category_id: category_id || undefined,
            limit: limit || 0,
            month_year: month_year || new Date().toISOString().split("T")[0],
        },
    });

    const {categories} = useData();
    const {closeModal} = useModal();
    const {forceRefresh} = useRefresh();
    const {showToast} = useToast();


    useEffect(() => {
        if (id && category_id && limit && month_year) {
            setValue("category_id", category_id);
            setValue("limit", limit);
            setValue("month_year", month_year);
        }
    }, [id, category_id, limit, month_year, setValue]);

    const onSubmit = async (data: BudgetFormData) => {
        try {
            const [year, month] = data.month_year.split("-");
            const formattedDate = `${year}-${month}-01`;

            const requestBody = {
                category_id: data.category_id,
                limit: data.limit,
                month_year: formattedDate,
            };

            let successMessage: string;

            if (id) {
                successMessage = await updateBudget(id, requestBody);
            } else {
                successMessage = await addBudget(requestBody);
            }

            showToast(successMessage, "success");
            forceRefresh();
            closeModal();
        } catch (error) {
            showToast(`Wystąpił nieoczekiwany błąd. Spróbuj ponownie}`, "error");
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
            validation: {required: "Kategoria jest wymagana"},
        },
        {
            id: "limit",
            label: "Limit budżetu",
            type: "number",
            validation: {
                required: "Limit budżetu jest wymagany",
                min: {value: 0, message: "Limit nie może być mniejszy niż 0"},
            },
        },
        {
            id: "month_year",
            label: "Miesiąc obowiązywania",
            type: "month",
            validation: {required: "Miesiąc obowiązywania jest wymagany"},
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
                    text={id ? "Zapisz zmiany" : "Dodaj budżet"}
                    padding="p-4"
                    radius="rounded-2xl"
                    minwidth="min-w-30"
                />
            </div>
        </form>
    );
};

export default BudgetForm;
