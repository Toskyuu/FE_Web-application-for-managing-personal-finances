import React, {useState, useEffect} from "react";
import {DropDownMenu, FilterTransactionForm, TransactionForm} from "@/components";
import apiClient from "@/lib/apiClient.tsx";
import {useData} from "@/hooks/useData.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {useFilters} from "@/hooks/useFilters";
import {useRefresh} from "@/hooks/useRefresh.tsx";

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
    const {openModal, closeModal} = useModal();
    const {filters} = useFilters();
    const {forceRefresh, refreshKey} = useRefresh();

    const size = 10;
    const {categories, accounts} = useData();

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

    useEffect(() => {
        fetchTransactions(page, sortBy, order, filters);
    }, [refreshKey]);

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

    const handleOpenModal = (content: React.ReactNode) => {
        openModal(content);
    };

    const handleEditTransaction = (
        id: number,
        description: string,
        amount: number,
        date: string,
        category_id: number,
        account_id: number,
        type: string,
        account_id_2?: number
    ) => {
        handleOpenModal(
            <TransactionForm
                id={id}
                description={description}
                amount={amount}
                date={date}
                category_id={category_id}
                account_id={account_id}
                type={type}
                account_id_2={account_id_2}
            />
        );
    };


    const handleDeleteTransaction = async (transactionId: number) => {
        openModal(
            <div className="flex flex-col items-center  space-y-4">
                <h2 className="text-xl font-bold text-center">Czy na pewno chcesz usunąć tę transakcję?</h2>
                <div className="flex space-x-4">
                    <button
                        className="px-6 py-2 bg-error text-white rounded-lg hover:bg-error-dark"
                        onClick={async () => {
                            try {
                                await apiClient.delete(`/transactions/${transactionId}`);
                                console.log(`Transakcja o ID ${transactionId} została usunięta`);
                                forceRefresh();
                            } catch (error) {
                                console.error("Błąd podczas usuwania transakcji:", error);
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
            <h1 className="text-2xl font-bold text-center mb-4">Transakcje</h1>

            <div className="flex justify-between items-center  w-full sm:w-3/4 mx-auto ">
                <div className="flex justify-end">
                    <button
                        onClick={() =>
                            openModal(<FilterTransactionForm/>)
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

            <div className="grid grid-cols-1 gap-6 w-full sm:w-3/4 mx-auto">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className={`relative flex flex-col items-start p-6 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-2xl rounded-2xl space-y-4 border-l-4 border-t-4 ${getBorderColor(transaction.type)}`}
                    >
                        <div className="absolute top-0 right-4">
                            <DropDownMenu
                                options={[
                                    {
                                        label: "Edytuj transakcję",
                                        onClick: () =>
                                            handleEditTransaction(
                                                transaction.id,
                                                transaction.description,
                                                transaction.amount,
                                                transaction.date,
                                                transaction.category_id,
                                                transaction.account_id,
                                                transaction.type,
                                                transaction.account_id_2 ? transaction.account_id_2 : undefined
                                            ),
                                    },
                                    {
                                        label: "Usuń transakcję",
                                        onClick: () => handleDeleteTransaction(transaction.id),
                                        className: "text-red-500",
                                    },
                                ]}
                            />
                        </div>

                        <p className="font-semibold text-sm">{getCategoryName(transaction.category_id)}</p>
                        {transaction.type === "Internal" ? (
                            <p className="text-md font-semibold">
                                {getAccountName(transaction.account_id)} &rarr; {getAccountName(transaction.account_id_2!)}
                            </p>
                        ) : (
                            <p className="text-md font-semibold">{getAccountName(transaction.account_id)}</p>
                        )}
                        <p className="text-sm">{transaction.description}</p>
                        <div className="flex flex-col items-end w-full">
                            <p
                                className={`text-lg font-semibold ${
                                    transaction.type === "Outcome" ? "text-red-500" : "text-green-500"
                                }`}
                            >
                                {`${transaction.amount.toFixed(2)} PLN`}
                            </p>
                            <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
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
};

export default TransactionsPage;
