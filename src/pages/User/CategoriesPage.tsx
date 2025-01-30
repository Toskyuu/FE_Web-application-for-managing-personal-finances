import React, {useState, useEffect} from "react";
import {CategoryForm, DefaultButton, DropDownMenu} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {deleteCategory, fetchCategories} from "@/API/CategoryAPI.tsx";
import {useData} from "@/hooks/useData.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";

interface Category {
    id: number;
    name: string;
    description: string;
}

interface CategoryResponse {
    categories: Category[];
    current_page: number;
    total_pages: number;
}

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>("id");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const {openModal, closeModal} = useModal();
    const {refreshKey, forceRefresh} = useRefresh();
    const {showToast} = useToast();
    const {fetchData} = useData();
    const [totalPages, setTotalPages] = useState<number>(1);
    const size = 10;


    const loadCategories = async (
        page: number,
        size: number,
        sortBy: string,
        order: "asc" | "desc"
    ) => {
        setIsLoading(true);
        try {
            const data: CategoryResponse = await fetchCategories(page, size, sortBy, order);
            setTotalPages(data.total_pages);
            setCategories(data.categories);
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCategories(page, size, sortBy, order);
    }, [page, size, sortBy, order, refreshKey]);


    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const toggleSortOrder = () => {
        setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        setPage(1);
    };

    const getSortIcon = () => {
        return order === "asc" ? "Rosnąco" : "Malejąco";
    };

    const handleEditCategory = (id: number, name: string, description: string) => {
        openModal(<CategoryForm id={id} name={name} description={description}/>)
    };

    const handleDeleteCategory = async (categoryId: number) => {
        openModal(
            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-xl font-bold">Czy na pewno chcesz usunąć tę kategorię?</h2>
                <div className="flex space-x-4">
                    <DefaultButton
                        bgColor=" bg-error"
                        color="text-text-dark"
                        onClick={async () => {
                            try {
                                let response = await deleteCategory(categoryId, fetchData);
                                showToast(response, "success");
                                forceRefresh();
                            } catch (error: any) {
                                showToast(error.message, "error")
                            } finally {
                                closeModal();
                            }
                        }}
                        text="Tak"
                        padding="px-6 py-3"
                        radius="rounded-xl"
                        fontSize="text-xl"
                        minwidth="w-full"
                    />
                    <DefaultButton
                        bgColor=" bg-success"
                        color="text-text-dark"
                        onClick={closeModal}
                        text="Nie"
                        padding="px-6 py-3"
                        radius="rounded-xl"
                        fontSize="text-xl"
                        minwidth="w-full"
                    />
                </div>
            </div>
        );
    };


    return (
        <div className="p-4 space-y-6 max-w-[1800px] justify-center mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 ">Kategorie</h1>

            <div className="flex justify-end items-center w-full lg:w-1/2 sm:w-3/4 mx-auto flex-wrap gap-3 h-full">
                <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setCategories([]);
                        setPage(1);
                    }}
                    className="p-3 cursor-pointer rounded-2xl h-12 shadow-xl bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:outline-none transition-all duration-300 hover:brightness-90 dark:hover:brightness-125"
                >
                    <option value="id">ID</option>
                    <option value="name">Nazwa</option>
                </select>

                <DefaultButton
                    onClick={toggleSortOrder}
                    text={getSortIcon()}
                    bgColor="bg-secondary"
                    color="text-text-dark"
                    padding="p-2"
                    radius="rounded-2xl"
                    fontSize=""
                    minwidth="w-full h-12"
                />
            </div>

            {isLoading && categories.length === 0 ? (
                <Loader/>
            ) : (
                <>
                    {categories.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2  gap-6 w-full lg:w-1/2 sm:w-3/4 mx-auto">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="relative flex flex-col items-start p-6 pt-2 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-2xl rounded-2xl"
                                    >
                                        <div className="flex justify-end items-center w-full">
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

                                        <div className="flex flex-row gap-4 justify-between  w-full flex-wrap">
                                            <div className="w-full flex flex-wrap justify-between">
                                                <div className="text-lg font-bold w-full text-center">{category.name}</div>
                                            </div>
                                            <hr className="w-full"/>
                                            <div className="flex flex-col justify-start w-full">
                                                <div className="text-md">{category.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {page < totalPages && (
                                <div className="flex justify-center">
                                    <DefaultButton
                                        text={isLoading ?
                                            (<Loader/>) : ("Załaduj więcej")}
                                        onClick={loadMore}
                                        bgColor="bg-secondary"
                                        color="text-text-dark"
                                        padding="px-6 py-3"
                                        radius="rounded-xl"
                                        fontSize="text-xl"
                                        minwidth="w-full"
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-center text-xl">Brak kont.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default CategoriesPage;
