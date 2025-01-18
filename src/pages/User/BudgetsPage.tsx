import React, {useState, useEffect} from "react";
import {BudgetForm, DropDownMenu} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {deleteBudget, fetchBudgets} from "@/API/BudgetAPI.tsx";
import {useToast} from "@/hooks/useToast.tsx";

interface Budget {
    id: number;
    limit: number;
    user_id: number;
    month_year: string;
    category_id: number;
    category_name: string;
    spent_in_budget: number;
}

const BudgetsPage: React.FC = () => {
        const [budgets, setBudgets] = useState<Budget[]>([]);
        const [page, setPage] = useState(1);
        const [isLoading, setIsLoading] = useState(false);
        const [sortBy, setSortBy] = useState<string>("month_year");
        const [order, setOrder] = useState<"asc" | "desc">("desc");
        const {openModal, closeModal} = useModal();
        const {refreshKey} = useRefresh();
        const {forceRefresh} = useRefresh();
        const {showToast} = useToast();

        const size = 10;

        const handleOpenModal = (content: React.ReactNode) => {
            openModal(content);
        };


        const loadBudgets = async (
            page: number,
            size: number,
            sortBy: string,
            order: "asc" | "desc"
        ) => {
            setIsLoading(true);
            try {
                const data = await fetchBudgets(page, size, sortBy, order);
                setBudgets((prev) => (page === 1 ? data : [...prev, ...data]));
            } catch (error: any) {
                showToast(error.message, "error")
            } finally {
                setIsLoading(false);
            }
        };

        useEffect(() => {
            loadBudgets(page, size, sortBy, order);
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


        const handleEditBudget = (
            id: number,
            limit: number,
            month_year: string,
            category_id: number,
            category_name: string) => {
            handleOpenModal(<BudgetForm id={id} limit={limit} month_year={month_year}
                                        category_id={category_id} category_name={category_name}/>)
        };

        const handleDeleteBudget = async (budgetId: number) => {
            openModal(
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-xl font-bold">Czy na pewno chcesz usunąć ten budżet?</h2>
                    <div className="flex space-x-4">
                        <button
                            className="px-6 py-2 bg-error text-white rounded-lg hover:bg-error-dark"
                            onClick={async () => {
                                try {
                                    let response = await deleteBudget(budgetId);
                                    showToast(response, "success");
                                    forceRefresh();
                                } catch (error: any) {
                                    showToast(error.message, "error");
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
                <h1 className="text-4xl font-bold text-center mb-4 ">Budżety</h1>

                <div className="flex justify-end items-center w-full sm:w-3/4 mx-auto space-x-4">
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setBudgets([]);
                        }}
                        className="p-3 rounded-2xl shadow-2xl bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                    >
                        <option value="month_year">Data</option>
                        <option value="spent_in_budget">Zapełnienie budżetu</option>
                        <option value="limit">Limit</option>

                    </select>
                    <button
                        onClick={toggleSortOrder}
                        className="p-3 sticky rounded-2xl shadow-2xl bg-secondary text-text-dark"
                    >
                        {getSortIcon()}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full sm:w-3/4 mx-auto">
                    {budgets.map((budget) => (
                        <div
                            key={budget.id}
                            className="relative flex flex-col items-start p-6 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-2xl rounded-2xl space-y-4"
                        >
                            <div className="absolute top-0 right-4">
                                <DropDownMenu
                                    options={[
                                        {
                                            label: "Edytuj budżet",
                                            onClick: () => handleEditBudget(budget.id, budget.limit, budget.month_year.slice(0, 7), budget.category_id, budget.category_name),
                                        },
                                        {
                                            label: "Usuń budżet",
                                            onClick: () => handleDeleteBudget(budget.id),
                                        },
                                    ]}
                                />
                            </div>

                            <p className="text-2xl font-bold">{budget.month_year.slice(0, 7)}</p>
                            <hr className="w-full"/>
                            <div className="py-3">
                                <p className="text-md">{budget.category_name}</p>
                                <p className="text-md text-success">Limit: {`${budget.limit.toFixed(2)} PLN`}</p>
                                <p className="text-md">Zapełnienie budżetu: {`${budget.spent_in_budget.toFixed(2)} PLN`}</p>
                            </div>
                        </div>
                    ))}

                </div>

                {isLoading ? (
                    <p className="text-center">Ładowanie...</p>
                ) : (
                    <button
                        onClick={loadMore}
                        className="block mx-auto mt-4 px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark"
                    >
                        Załaduj więcej
                    </button>
                )}
            </div>
        );
    }
;

export default BudgetsPage;
