import React, {useState, useEffect} from "react";
import {DropDownMenu, FilterTransactionForm, TransactionForm} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useFilters} from "@/hooks/useFilters";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {deleteTransaction, fetchTransactions} from "@/API/TransactionAPI.tsx";

interface Transaction {
    id: number;
    category_id: number;
    category_name: string;
    account_id: number;
    account_name: string;
    account_id_2?: number;
    account_2_name?: string;
    user_id: number;
    transaction_date: string;
    type: "Outcome" | "Income" | "Internal";
    amount: number;
    description: string;
}

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState<string>("transaction_date");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const {openModal, closeModal} = useModal();
    const {filters} = useFilters();
    const {forceRefresh, refreshKey} = useRefresh();
    const {showToast} = useToast();


    const size = 10;

    const loadTransactions = async (
        page: number,
        size: number,
        sortBy: string,
        order: "asc" | "desc",
        filters: any
    ) => {
        setIsLoading(true);
        try {
            const data = await fetchTransactions(page, size, sortBy, order, filters);
            setTransactions((prev) => (page === 1 ? data : [...prev, ...data]));
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTransactions(page, size, sortBy, order, filters);
    }, [page, size, sortBy, order, filters, refreshKey]);


    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const toggleSortOrder = () => {
        setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        setPage(1);
        setTransactions([]);
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

    const handleEditTransaction = (
        id: number,
        description: string,
        amount: number,
        transaction_date: string,
        category_id: number,
        category_name: string,
        account_id: number,
        account_name: string,
        type: string,
        account_id_2?: number,
        account_2_name?: string
    ) => {
        openModal(
            <TransactionForm
                id={id}
                description={description}
                amount={amount}
                transaction_date={transaction_date}
                category_id={category_id}
                category_name={category_name}
                account_id={account_id}
                account_name={account_name}
                type={type}
                account_id_2={account_id_2}
                account_2_name={account_2_name}
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
                                let response = await deleteTransaction(transactionId);
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
                        <option value="transaction_date">Data</option>
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
                                                transaction.transaction_date,
                                                transaction.category_id,
                                                transaction.category_name,
                                                transaction.account_id,
                                                transaction.account_name,
                                                transaction.type,
                                                transaction.account_id_2 ? transaction.account_id_2 : undefined,
                                                transaction.account_2_name ? transaction.account_2_name : undefined
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

                        <p className="font-semibold text-sm">{transaction.category_name}</p>
                        {transaction.type === "Internal" ? (
                            <p className="text-md font-semibold">
                                {transaction.account_name} &rarr; {transaction.account_2_name!}
                            </p>
                        ) : (
                            <p className="text-md font-semibold">{transaction.account_name}</p>
                        )}
                        <p className="text-sm">{transaction.description}</p>
                        <div className="flex flex-col items-end w-full">
                            <p
                                className={`text-lg font-semibold ${
                                    transaction.type === "Outcome" ? "text-error" : "text-success"
                                }`}
                            >
                                {`${transaction.amount.toFixed(2)} PLN`}
                            </p>
                            <p className="text-sm text-gray-500">{new Date(transaction.transaction_date).toLocaleDateString()}</p>
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
