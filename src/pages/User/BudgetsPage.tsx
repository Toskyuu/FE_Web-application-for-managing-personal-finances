import React, {useState, useEffect} from "react";
import {BudgetForm, DefaultButton, DropDownMenu} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {deleteBudget, fetchBudgets} from "@/API/BudgetAPI.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {translateMonth} from "@/utils/Translators.tsx";
import FilterBudgetForm from "@/components/Elements/Forms/Filters/FilterBudgetForm.tsx";
import {useFilters} from "@/hooks/useFilters.tsx";

interface Budget {
    id: number;
    limit: number;
    user_id: number;
    month_year: string;
    category_id: number;
    category_name: string;
    spent_in_budget: number;
    spent_to_limit_ratio: number;
}

interface BudgetResponse {
    budgets: Budget[];
    current_page: number;
    total_pages: number;
}

const BudgetsPage: React.FC = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState<string>("month_year");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const {openModal, closeModal} = useModal();
    const {forceRefresh, refreshKey} = useRefresh();
    const {showToast} = useToast();
    const [totalPages, setTotalPages] = useState<number>(1);
    const size = 10;
    const {budgetFilters} = useFilters();

    const loadBudgets = async (
        page: number,
        size: number,
        sortBy: string,
        order: "asc" | "desc",
        filters: any
    ) => {
        setIsLoading(true);
        try {
            const {month_year, ...rest} = filters;

            const formattedMonthYear =
                month_year && month_year.includes("-") ? `${month_year}-01` : null;

            const updatedFilters = {
                ...rest,
                month_year: formattedMonthYear,
            };
            const data: BudgetResponse = await fetchBudgets(page, size, sortBy, order, updatedFilters);
            setTotalPages(data.total_pages);
            setBudgets((prev) => (page === 1 ? data.budgets : [...prev, ...data.budgets]));
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadBudgets(page, size, sortBy, order, budgetFilters);
    }, [page, size, sortBy, order, budgetFilters, refreshKey]);


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
        closeModal();
        openModal(<BudgetForm id={id} limit={limit} month_year={month_year}
                              category_id={category_id} category_name={category_name}/>)
    };

    const handleDeleteBudget = async (budgetId: number) => {
        closeModal();
        openModal(
            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-xl font-bold">Czy na pewno chcesz usunąć ten budżet?</h2>
                <div className="flex space-x-4">
                    <DefaultButton
                        bgColor=" bg-error"
                        color="text-text-dark"
                        onClick={async () => {
                            try {
                                let response = await deleteBudget(budgetId);
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
        <div className="p-4 space-y-6 ">
            <h1 className="text-4xl font-bold text-center mb-4 ">Budżety</h1>

            <div className="flex justify-between items-center w-full sm:w-3/4 h-full mx-auto flex-wrap gap-3">
                <div className="flex justify-start w-auto ">
                    <DefaultButton
                        onClick={() => openModal(<FilterBudgetForm/>)}
                        text="Filtry"
                        bgColor="bg-secondary"
                        color="text-text-dark"
                        padding="p-3"
                        radius="rounded-2xl"
                        fontSize=""
                        minwidth="w-full h-12"
                    />
                </div>
                <div className="flex justify-end items-center w-auto flex-wrap gap-3">
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setBudgets([]);
                            setPage(1);
                        }}
                        className="p-3 cursor-pointer rounded-2xl h-12 shadow-xl bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:outline-none transition-all duration-300 hover:brightness-90 dark:hover:brightness-125"
                    >
                        <option value="month_year">Data</option>
                        <option value="spent_in_budget">Wydane pieniądze</option>
                        <option value="limit">Limit</option>
                        <option value="spent_to_limit_ratio">Zapełnienie budżetu</option>
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

                        <div className="flex flex-wrap justify-between text-2xl  w-full gap-6">
                            <div className="font-bold">{budget.category_name}</div>
                            <div>{translateMonth(budget.month_year)} {budget.month_year.slice(0, 4)}</div>
                        </div>
                        <hr className="w-full"/>
                        <div className="py-3">
                            <p className="text-md text-success">Limit: {`${budget.limit.toFixed(2)} PLN`}</p>
                            <p className="text-md">Wydane
                                pieniądze: {`${budget.spent_in_budget.toFixed(2)} PLN`}</p>
                            <p className="text-md">Zapełnienie
                                budżetu: {`${budget.spent_to_limit_ratio.toFixed(2)} %`}</p>
                        </div>
                    </div>
                ))}

            </div>

            {isLoading && <p className="text-center">Ładowanie...</p>}

            {!isLoading && budgets.length === 0 && (
                <p className="text-center text-gray-500">Aktualnie nie ma jeszcze tutaj żadnych budżetów.</p>
            )}


            {page < totalPages && !isLoading && budgets.length > 0 && (
                <div className="flex justify-center">
                    <button
                        onClick={loadMore}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    >
                        Załaduj więcej
                    </button>
                </div>
            )}
        </div>
    )
};

export default BudgetsPage;
