import React, {useState, useEffect} from "react";
import {DropDownMenu, RecurringTransactionForm} from "@/components";
import apiClient from "@/lib/apiClient.tsx";
import {useData} from "@/hooks/useData.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {translateRecurringType} from "@/utils/Translators.tsx";

interface RecurringTransactions {
    id: number;
    category_id: number;
    account_id: number;
    account_id_2?: number;
    user_id: number;
    type: string;
    amount: number;
    description: string;
    start_date: string;
    next_occurrence: string;
    recurring_frequency: string;
}

const RecurringTransactionsPage: React.FC = () => {
    const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransactions[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState<string>("id");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const {openModal, closeModal} = useModal();
    const {forceRefresh, refreshKey} = useRefresh();

    const size = 10;
    const {categories, accounts} = useData();

    const fetchRecurringTransactions = async (
        page: number,
        sortBy: string,
        order: "asc" | "desc",
    ) => {
        setIsLoading(true);
        try {
            const response = await apiClient.post("/recurring-transactions/recurring-transactions", {
                page,
                size,
                sort_by: sortBy,
                order,
            });
            setRecurringTransactions((prev) => (page === 1 ? response.data : [...prev, ...response.data]));
        } catch (error) {
            console.error("Błąd podczas pobierania transakcji cyklicznych:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecurringTransactions(page, sortBy, order);
    }, [page, sortBy, order]);

    useEffect(() => {
        fetchRecurringTransactions(page, sortBy, order);
    }, [refreshKey]);

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const toggleSortOrder = () => {
        setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        setPage(1);
        setRecurringTransactions([]);
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

    const handleEditRecurringTransaction = (
            id: number,
            description: string,
            amount: number,
            category_id: number,
            account_id: number,
            type: string,
            start_date: string,
            next_occurrence: string,
            recurring_frequency: string,
            account_id_2 ?: number
        ) => {
            handleOpenModal(
                <RecurringTransactionForm
                    id={id}
                    description={description}
                    amount={amount}
                    category_id={category_id}
                    account_id={account_id}
                    type={type}
                    start_date={start_date}
                    next_occurrence={next_occurrence}
                    recurring_frequency={recurring_frequency}
                    account_id_2={account_id_2}
                />
            );
        }
    ;


    const handleDeleteRecurringTransaction = async (recurringTransactionId: number) => {
        openModal(
            <div className="flex flex-col items-center  space-y-4">
                <h2 className="text-xl font-bold text-center">Czy na pewno chcesz usunąć tę transakcję cykliczną?</h2>
                <div className="flex space-x-4">
                    <button
                        className="px-6 py-2 bg-error text-white rounded-lg hover:bg-error-dark"
                        onClick={async () => {
                            try {
                                await apiClient.delete(`/recurring-transactions/${recurringTransactionId}`);
                                console.log(`Transakcja cykliczna o ID ${recurringTransactionId} została usunięta`);
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
            <h1 className="text-2xl font-bold text-center mb-4">Transakcje cykliczne</h1>
            <div className="flex justify-end items-center  w-full sm:w-3/4 mx-auto ">
                <div className="space-x-4">
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setPage(1);
                            setRecurringTransactions([]);
                        }}
                        className="p-3 rounded-2xl shadow-2xl bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                    >
                        <option value="id">ID</option>
                        <option value="amount">Kwota</option>
                        <option value="recurring_frequency">Częstotliwość</option>
                    </select>
                    <button
                        onClick={toggleSortOrder}
                        className="p-3 sticky rounded-2xl shadow-2xl bg-secondary text-text-dark"
                    >
                        {getSortIcon()}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full sm:w-3/4 mx-auto">
                {recurringTransactions.map((recurringTransaction) => (
                    <div
                        key={recurringTransaction.id}
                        className={`relative flex flex-col items-start p-6 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-2xl rounded-2xl space-y-4 border-l-4 border-t-4 ${getBorderColor(recurringTransaction.type)}`}
                    >
                        {/* Menu opcji */}
                        <div className="absolute top-4 right-4">
                            <DropDownMenu
                                options={[
                                    {
                                        label: "Edytuj transakcję",
                                        onClick: () =>
                                            handleEditRecurringTransaction(
                                                recurringTransaction.id,
                                                recurringTransaction.description,
                                                recurringTransaction.amount,
                                                recurringTransaction.category_id,
                                                recurringTransaction.account_id,
                                                recurringTransaction.type,
                                                recurringTransaction.start_date,
                                                recurringTransaction.next_occurrence,
                                                recurringTransaction.recurring_frequency,
                                                recurringTransaction.account_id_2 ? recurringTransaction.account_id_2 : undefined
                                            ),
                                    },
                                    {
                                        label: "Usuń transakcję cykliczną",
                                        onClick: () => handleDeleteRecurringTransaction(recurringTransaction.id),
                                        className: "text-red-500",
                                    },
                                ]}
                            />
                        </div>

                        {/* Kategoria */}
                        <p className="text-sm font-bold uppercase text-gray-500">
                            {getCategoryName(recurringTransaction.category_id)}
                        </p>

                        {/* Opis i konta */}
                        <div className="w-full space-y-2">
                            {recurringTransaction.type === "Internal" ? (
                                <p className="text-md font-semibold">
                                    {getAccountName(recurringTransaction.account_id)}
                                    <span className="text-gray-400 mx-1">→</span>
                                    {getAccountName(recurringTransaction.account_id_2!)}
                                </p>
                            ) : (
                                <p className="text-md font-semibold">{getAccountName(recurringTransaction.account_id)}</p>
                            )}
                            <p className="text-sm text-gray-700 dark:text-gray-400">{recurringTransaction.description}</p>
                        </div>

                        {/* Kwota */}
                        <p
                            className={`text-lg font-bold ${
                                recurringTransaction.type === "Outcome" ? "text-red-500" : "text-green-500"
                            }`}
                        >
                            {`${recurringTransaction.amount.toFixed(2)} PLN`}
                        </p>

                        {/* Szczegóły transakcji */}
                        <div className="w-full mt-4 border-t border-gray-300 dark:border-gray-700 pt-4 space-y-2">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Data rozpoczęcia:</span>{" "}
                                {new Date(recurringTransaction.start_date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Kolejna płatność:</span>{" "}
                                {new Date(recurringTransaction.next_occurrence).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Częstotliwość:</span>{" "}
                                {translateRecurringType(recurringTransaction.recurring_frequency)}
                            </p>
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

export default RecurringTransactionsPage;
