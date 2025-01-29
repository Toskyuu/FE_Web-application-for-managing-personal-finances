import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useModal} from "@/hooks/useModal.tsx";
import {DefaultButton, FormField} from "@/components";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {addCategory, updateCategory} from "@/API/CategoryAPI.tsx";
import {useData} from "@/hooks/useData.tsx";

interface CategoryFormData {
    name: string;
    description: string;
}

interface CategoryFormProps {
    id?: number;
    name?: string;
    description?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({id, name, description}) => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<CategoryFormData>({
        defaultValues: {
            name: name || "",
            description: description || "",
        },
    });
    const {closeModal} = useModal();
    const {forceRefresh} = useRefresh();
    const {showToast} = useToast();
    const {fetchData} = useData();


    const onSubmit = async (data: CategoryFormData) => {
        try {
            let successMessage: string;

            if (id) {
                successMessage = await updateCategory(id, data, fetchData);
            } else {
                successMessage = await addCategory(data, fetchData);
            }

            showToast(successMessage, "success");
            forceRefresh();
            closeModal();
        } catch (error: any) {
            showToast(error.message, "error")
        }
    };

    const fields = [
        {
            id: "name",
            label: "Nazwa kategorii",
            type: "text",
            validation: {required: "Nazwa kategorii jest wymagana"},
        },
        {
            id: "description",
            label: "Opis kategorii",
            type: "text",
            validation: {required: "Opis kategorii jest wymagany"},
        },
    ];

    useEffect(() => {
        if (id && name && description) {
            setValue("name", name);
            setValue("description", description);
        }
    }, [name, description, setValue]);

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
                    text={"Dodaj kategorię"}
                    padding="p-4"
                    radius="rounded-2xl"
                    minwidth="min-w-30"
                />
            </div>
        </form>
    );
};

export default CategoryForm;
