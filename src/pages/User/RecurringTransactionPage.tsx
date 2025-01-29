import React, {useState, useEffect} from "react";
import {DefaultButton, DropDownMenu, RecurringTransactionForm} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {translateRecurringType} from "@/utils/Translators.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {deleteRecurringTransaction, fetchRecurringTransactions} from "@/API/RecurringTransactionAPI.tsx";

interface RecurringTransactions {
    id: number;
    category_id: number;
    category_name: string;
    account_id: number;
    account_name: string;
    account_id_2?: number;
    account_2_name?: string;
    user_id: number;
    type: string;
    amount: number;
    description: string;
    start_date: string;
    next_occurrence: string;
    recurring_frequency: string;
}

interface RecurringTransactionResponse {
    recurring_transactions: RecurringTransactions[];
    current_page: number;
    total_pages: number;
}

const RecurringTransactionsPage: React.FC = () => {
    const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransactions[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState<string>("id");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const {openModal, closeModal} = useModal();
    const {forceRefresh, refreshKey} = useRefresh();
    const {showToast} = useToast();
    const [totalPages, setTotalPages] = useState<number>(1);
    const size = 10;

    const loadRecurringTransactions = async (
        page: number,
        size: number,
        sortBy: string,
        order: "asc" | "desc",
    ) => {
        setIsLoading(true);
        try {
            const data: RecurringTransactionResponse = await fetchRecurringTransactions(page, size, sortBy, order);
            setTotalPages(data.total_pages);
            setRecurringTransactions((prev) => (page === 1 ? data.recurring_transactions : [...prev, ...data.recurring_transactions]));
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadRecurringTransactions(page, size, sortBy, order);
    }, [page, size, sortBy, order, refreshKey]);


    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const toggleSortOrder = () => {
        setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        setPage(1);
    };


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


    const handleEditRecurringTransaction = (
            id: number,
            description: string,
            amount: number,
            category_id: number,
            category_name: string,
            account_id: number,
            account_name: string,
            type: string,
            start_date: string,
            next_occurrence: string,
            recurring_frequency: string,
            account_id_2 ?: number,
            account_2_name?: string
        ) => {
            openModal(
                <RecurringTransactionForm
                    id={id}
                    description={description}
                    amount={amount}
                    category_id={category_id}
                    category_name={category_name}
                    account_id={account_id}
                    account_name={account_name}
                    type={type}
                    start_date={start_date}
                    next_occurrence={next_occurrence}
                    recurring_frequency={recurring_frequency}
                    account_id_2={account_id_2}
                    account_2_name={account_2_name}

                />
            );
        }
    ;


    const handleDeleteRecurringTransaction = async (recurringTransactionId: number) => {
        openModal(
            <div className="flex flex-col items-center  space-y-4">
                <h2 className="text-xl font-bold text-center">Czy na pewno chcesz usunąć tę transakcję cykliczną?</h2>
                <div className="flex space-x-4">
                    <DefaultButton
                        bgColor=" bg-error"
                        color="text-text-dark"
                        onClick={async () => {
                            try {
                                let response = await deleteRecurringTransaction(recurringTransactionId);
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
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold text-center mb-4">Transakcje cykliczne</h1>

            <div className="flex justify-end items-center w-full sm:w-3/4 mx-auto flex-wrap gap-3 h-full">
                <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setPage(1);
                        setRecurringTransactions([]);
                    }}
                    className="p-3 cursor-pointer rounded-2xl h-12 shadow-xl bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:outline-none transition-all duration-300 hover:brightness-90 dark:hover:brightness-125"
                >
                    <option value="id">ID</option>
                    <option value="amount">Kwota</option>
                    <option value="recurring_frequency">Częstotliwość</option>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full sm:w-3/4 mx-auto">
                {recurringTransactions.map((recurringTransaction) => (
                    <div
                        key={recurringTransaction.id}
                        className={`relative flex flex-col items-start p-6 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-2xl rounded-2xl space-y-4 border-l-4 border-t-4 ${getBorderColor(recurringTransaction.type)}`}
                    >
                        <div className="absolute top-4 right-4">
                            <DropDownMenu
                                options={[
                                    {
                                        label: "Edytuj transakcję cykliczną",
                                        onClick: () =>
                                            handleEditRecurringTransaction(
                                                recurringTransaction.id,
                                                recurringTransaction.description,
                                                recurringTransaction.amount,
                                                recurringTransaction.category_id,
                                                recurringTransaction.category_name,
                                                recurringTransaction.account_id,
                                                recurringTransaction.account_name,
                                                recurringTransaction.type,
                                                recurringTransaction.start_date,
                                                recurringTransaction.next_occurrence,
                                                recurringTransaction.recurring_frequency,
                                                recurringTransaction.account_id_2 ? recurringTransaction.account_id_2 : undefined,
                                                recurringTransaction.account_2_name ? recurringTransaction.account_2_name : undefined
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

                        <p className="text-sm font-bold uppercase text-gray-500">
                            {recurringTransaction.category_name}
                        </p>

                        <div className="w-full space-y-2">
                            {recurringTransaction.type === "Internal" ? (
                                <p className="text-md font-semibold">
                                    {recurringTransaction.account_name}
                                    <span className="text-gray-400 mx-1">→</span>
                                    {recurringTransaction.account_2_name}
                                </p>
                            ) : (
                                <p className="text-md font-semibold">{recurringTransaction.account_name}</p>
                            )}
                            <p className="text-sm text-gray-700 dark:text-gray-400">{recurringTransaction.description}</p>
                        </div>

                        <p
                            className={`text-lg font-bold ${
                                recurringTransaction.type === "Outcome" ? "text-red-500" : "text-green-500"
                            }`}
                        >
                            {`${recurringTransaction.amount.toFixed(2)} PLN`}
                        </p>

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


            {isLoading && <p className="text-center">Ładowanie...</p>}

            {!isLoading && recurringTransactions.length === 0 && (
                <p className="text-center text-gray-500">Aktualnie nie ma jeszcze tutaj żadnych transakcji
                    cyklicznych.</p>
            )}


            {page < totalPages && !isLoading && recurringTransactions.length > 0 && (
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
    );
};

export default RecurringTransactionsPage;
