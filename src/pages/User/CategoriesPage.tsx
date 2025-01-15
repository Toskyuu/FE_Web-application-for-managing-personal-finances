import React, {useState, useEffect} from "react";
import {CategoryForm, DropDownMenu} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {deleteCategory, fetchCategories} from "@/API/CategoryAPI.tsx";

interface Category {
    id: number;
    name: string;
    description: string;
}

const CategoriesPage: React.FC = () => {
        const [categories, setCategories] = useState<Category[]>([]);
        const [isLoading, setIsLoading] = useState(false);
        const [sortBy, setSortBy] = useState<string>("id");
        const [order, setOrder] = useState<"asc" | "desc">("desc");
        const {openModal, closeModal} = useModal();
        const {refreshKey} = useRefresh();
        const {forceRefresh} = useRefresh();
        const {showToast} = useToast();


        const handleOpenModal = (content: React.ReactNode) => {
            openModal(content);
        };


        const loadCategories = async (
            sortBy: string,
            order: "asc" | "desc"
        ) => {
            setIsLoading(true);
            try {
                const data = await fetchCategories(sortBy, order);
                setCategories(data);
            } catch (error: any) {
                showToast(error, "error")
            } finally {
                setIsLoading(false);
            }
        };

        useEffect(() => {
            loadCategories(sortBy, order);
        }, [sortBy, order, refreshKey]);


        const toggleSortOrder = () => {
            setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
            setCategories([]);
        };

        const getSortIcon = () => {
            return order === "asc" ? "Rosnąco" : "Malejąco";
        };

        const handleEditCategory = (id: number, name: string, description: string) => {
            handleOpenModal(<CategoryForm id={id} name={name} description={description}/>)
        };

        const handleDeleteCategory = async (categoryId: number) => {
            openModal(
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-xl font-bold">Czy na pewno chcesz usunąć tę kategorię?</h2>
                    <div className="flex space-x-4">
                        <button
                            className="px-6 py-2 bg-error text-white rounded-lg hover:bg-error-dark"
                            onClick={async () => {
                                try {
                                    let response = await deleteCategory(categoryId);
                                    showToast(response, "success");
                                    forceRefresh();
                                } catch (error: any) {
                                    showToast(error, "error");
                                } finally {
                                    closeModal();
                                }
                            }}
                        >
                            Tak
                        </button>
                        <button
                            className="px-6 py-2 bg-success text-white rounded-lg hover:bg-success-dark"
                            onClick={closeModal}
                        >
                            Nie
                        </button>
                    </div>
                </div>
            );
        };


        return (
            <div className="p-4 space-y-6">
                <h1 className="text-4xl font-bold text-center mb-4 ">Kategorie</h1>

                <div className="flex justify-end items-center w-full sm:w-3/4 mx-auto space-x-4">
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setCategories([]);
                        }}
                        className="p-3 rounded-2xl shadow-2xl bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                    >
                        <option value="id">ID</option>
                        <option value="name">Nazwa</option>

                    </select>
                    <button
                        onClick={toggleSortOrder}
                        className="p-3 sticky rounded-2xl shadow-2xl bg-secondary text-text-dark"
                    >
                        {getSortIcon()}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full sm:w-3/4 mx-auto">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="relative flex flex-col items-start p-6 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-2xl rounded-2xl space-y-4"
                        >
                            <div className="absolute top-0 right-4">
                                <DropDownMenu
                                    options={[
                                        {
                                            label: "Edytuj kategorię",
                                            onClick: () => handleEditCategory(category.id, category.name, category.description),
                                        },
                                        {
                                            label: "Usuń kategorię",
                                            onClick: () => handleDeleteCategory(category.id),
                                        },
                                    ]}
                                />
                            </div>

                            <p className="text-2xl font-bold">{category.name}</p>
                            <hr className="w-full"/>
                            <div className="py-3">
                                <p className="text-md">{category.description}</p>
                            </div>
                        </div>
                    ))}

                </div>

                {isLoading && (
                    <p className="text-center">Ładowanie...</p>
                )}
            </div>
        );
    }
;

export default CategoriesPage;
