import React, { useState, useEffect } from "react";
import { FilterTransactionForm, MainCard } from "@/components";
import apiClient from "@/lib/apiClient.tsx";
import { useData } from "@/hooks/useData.tsx";
import { useModal } from "@/hooks/useModal.tsx";
import { useFilters } from "@/hooks/useFilters";

interface Transaction {
    id: number;
    category_id: number;
    account_id: number;
    account_id_2?: number;
    user_id: number;
    date: string;
    type: "Outcome" | "Income" | "Internal";
    amount: number;
    description: string;
}

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState<string>("date");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const { openModal } = useModal();
    const { filters } = useFilters();

    const size = 10;
    const { categories, accounts } = useData();

    const fetchTransactions = async (
        page: number,
        sortBy: string,
        order: "asc" | "desc",
        filters: any
    ) => {
        setIsLoading(true);
        try {
            const response = await apiClient.post("/transactions/transactions", {
                page,
                size,
                sort_by: sortBy,
                order,
                ...filters,
            });
            setTransactions((prev) => (page === 1 ? response.data : [...prev, ...response.data]));
        } catch (error) {
            console.error("Błąd podczas pobierania transakcji:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions(page, sortBy, order, filters);
    }, [page, sortBy, order, filters]);

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const toggleSortOrder = () => {
        setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        setPage(1);
        setTransactions([]);
    };

    const getCategoryName = (id: number) => categories.find((cat) => cat.id === id)?.name || "Nieznana kategoria";
    const getAccountName = (id: number) => accounts.find((acc) => acc.id === id)?.name || "Nieznane konto";

    const getBorderColor = (type: string) => {
        switch (type) {
            case "Outcome":
                return "border-error";
            case "Income":
                return "border-success";
            case "Internal":
                return "border-secondary";
            default:
                return "border-gray-500";
        }
    };

    const getSortIcon = () => {
        return order === "asc" ? "Rosnąco" : "Malejąco";
    };

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold text-center mb-4">Transakcje</h1>

            <div className="flex justify-between items-center  w-full sm:w-3/4 mx-auto ">
                <div className="flex justify-end">
                    <button
                        onClick={() =>
                            openModal(<FilterTransactionForm  />)
                        }
                        className="p-3 rounded-2xl shadow-2xl bg-secondary text-text-dark"
                    >
                        Filtry
                    </button>
                </div>
                <div className="space-x-4">
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setPage(1);
                            setTransactions([]);
                        }}
                        className="p-3 rounded-2xl shadow-2xl bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                    >
                        <option value="date">Data</option>
                        <option value="amount">Kwota</option>
                    </select>
                    <button
                        onClick={toggleSortOrder}
                        className="p-3 sticky rounded-2xl shadow-2xl bg-secondary text-text-dark"
                    >
                        {getSortIcon()}
                    </button>
                </div>
            </div>

            {transactions.map((transaction) => (
                <MainCard
                    key={transaction.id}
                    fontSize="text-base"
                    padding="p-6"
                    height="h-auto"
                    width="w-full sm:w-3/4 mx-auto"
                >
                    <div
                        className={`flex flex-col md:flex-row items-start md:items-center border-l-4 ${getBorderColor(transaction.type)} pl-4`}
                    >
                        <div className="flex-1">
                            <p className="font-semibold text-sm text-left">
                                {getCategoryName(transaction.category_id)}
                            </p>
                            {transaction.type === "Internal" ? (
                                <p className="mt-2 font-semibold text-sm text-left">
                                    {getAccountName(transaction.account_id)} &rarr; {getAccountName(transaction.account_id_2!)}
                                </p>
                            ) : (
                                <p className="mt-2 font-semibold text-sm text-left">
                                    {getAccountName(transaction.account_id)}
                                </p>
                            )}
                            <p className="mt-2 text-left">
                                {transaction.description}
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className={`text-lg font-semibold ${transaction.type === "Outcome" ? "text-red-500" : "text-green-500"}`}>
                                {`${transaction.amount} PLN`}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                {new Date(transaction.date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </MainCard>
            ))}

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
};

export default TransactionsPage;
