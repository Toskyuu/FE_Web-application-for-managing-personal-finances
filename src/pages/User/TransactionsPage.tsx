import React, {useState, useEffect} from "react";
import {
    DefaultButton,
    DropDownMenu,
    FilterTransactionForm,
    RecurringTransactionForm,
    TransactionForm
} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useFilters} from "@/hooks/useFilters";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {deleteTransaction, fetchTransactions} from "@/API/TransactionAPI.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";
import {translateTransactionType} from "@/utils/Translators.tsx";

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

interface TransactionResponse {
    transactions: Transaction[];
    current_page: number;
    total_pages: number;
}

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState<string>("transaction_date");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const {openModal, closeModal} = useModal();
    const {transactionFilters} = useFilters();
    const {forceRefresh, refreshKey} = useRefresh();
    const {showToast} = useToast();
    const [totalPages, setTotalPages] = useState<number>(1);
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
            const data: TransactionResponse = await fetchTransactions(page, size, sortBy, order, filters);
            setTotalPages(data.total_pages)
            setTransactions((prev) => (page === 1 ? data.transactions : [...prev, ...data.transactions]));
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        loadTransactions(page, size, sortBy, order, transactionFilters);
    }, [page, size, sortBy, order, transactionFilters, refreshKey]);


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

    const handleSetRecurringTransaction = (
        description: string,
        amount: number,
        category_id: number,
        category_name: string,
        account_id: number,
        account_name: string,
        type: string,
        account_id_2?: number,
        account_2_name?: string
    ) => {
        openModal(
            <RecurringTransactionForm
                description={description}
                amount={amount}
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
                    <DefaultButton
                        bgColor=" bg-error"
                        color="text-text-dark"
                        onClick={async () => {
                            try {
                                let response = await deleteTransaction(transactionId);
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
            <h1 className="text-4xl font-bold text-center mb-4">Transakcje</h1>

            <div className="flex justify-between items-center w-full sm:w-1/2 h-full mx-auto flex-wrap gap-3">
                <div className="flex justify-start w-auto">
                    <DefaultButton
                        onClick={() => openModal(<FilterTransactionForm/>)}
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
                            setPage(1);
                            setTransactions([]);
                        }}
                        className="p-3 cursor-pointer rounded-2xl h-12 shadow-xl bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:outline-none transition-all duration-300 hover:brightness-90 dark:hover:brightness-125"
                    >
                        <option value="transaction_date">Data</option>
                        <option value="amount">Kwota</option>
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

            {isLoading && transactions.length === 0 ? (
                <Loader/>
            ) : (
                <>
                    {transactions.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 w-full sm:w-1/2 mx-auto">
                                {transactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="relative flex flex-col items-start justify-between px-6 pb-6 pt-2 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-2xl rounded-2xl"
                                    >
                                        <div
                                            className="flex justify-end items-center w-full border-b pb-1 mb-4">
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
                                                    },
                                                    {
                                                        label: "Ustaw jako cykliczną",
                                                        onClick: () =>
                                                            handleSetRecurringTransaction(
                                                                transaction.description,
                                                                transaction.amount,
                                                                transaction.category_id,
                                                                transaction.category_name,
                                                                transaction.account_id,
                                                                transaction.account_name,
                                                                transaction.type,
                                                                transaction.account_id_2 ? transaction.account_id_2 : undefined,
                                                                transaction.account_2_name ? transaction.account_2_name : undefined
                                                            ),
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="flex flex-row justify-between w-full text-sm sm:text-md ">
                                            <div className="flex flex-col items-start text-left w-full ">
                                                <p className="font-bold text-lg sm:text-xl">{transaction.category_name}</p>
                                                <p className="">{transaction.description}</p>
                                                {transaction.type === "Internal" ? (
                                                    <p className="">
                                                        {transaction.account_name} → {transaction.account_2_name!}
                                                    </p>
                                                ) : (
                                                    <p className="">{transaction.account_name}</p>
                                                )}
                                            </div>

                                            <div
                                                className="flex flex-col items-end text-right w-full  ">
                                                <p
                                                    className={`text-lg sm:text-xl font-semibold ${
                                                        transaction.type === "Outcome"
                                                            ? "text-error"
                                                            : transaction.type === "Income"
                                                                ? "text-success"
                                                                : "text-tertiary"
                                                    }`}
                                                >
                                                    {`${transaction.amount.toFixed(2)} PLN`}
                                                </p>
                                                <p className="">
                                                    {new Date(transaction.transaction_date).toLocaleDateString()}
                                                </p>
                                                <p className="">{translateTransactionType(transaction.type)}</p>
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
                        <p className="text-center text-xl">Brak transakcji</p>
                    )}
                </>
            )}
        </div>
    );
};

export default TransactionsPage;