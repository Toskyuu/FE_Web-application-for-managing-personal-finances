import React from "react";
import { useForm } from "react-hook-form";
import apiClient from "@/lib/apiClient.tsx";
import { useModal } from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";

interface CategoryFormData {
    name: string;
    description: string;
}

const CategoryCreateForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CategoryFormData>();
    const { closeModal } = useModal();


    const onSubmit = async (data: CategoryFormData) => {
        try {
            const response = await apiClient.post("/categories", data);
            console.log("Category successfully created:", response.data);
            closeModal();
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const fields = [
        {
            id: "name",
            label: "Nazwa kategorii",
            type: "text",
            validation: { required: "Nazwa kategorii jest wymagana" },
        },
        {
            id: "description",
            label: "Opis kategorii",
            type: "text",
            validation: { required: "Opis kategorii jest wymagany" },
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
                    text={"Dodaj kategorię"}
                    padding="p-4"
                    radius="rounded-2xl"
                    minwidth="min-w-30"
                />
            </div>
        </form>
    );
};

export default CategoryCreateForm;
