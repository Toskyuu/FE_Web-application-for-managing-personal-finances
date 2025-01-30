import React, {useState, useEffect} from "react";
import {DefaultButton, DropDownMenu, RecurringTransactionForm} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {translateRecurringType, translateTransactionType} from "@/utils/Translators.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {deleteRecurringTransaction, fetchRecurringTransactions} from "@/API/RecurringTransactionAPI.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
    const [expandedTransactionIds, setExpandedTransactionIds] = useState<number[]>([]);


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


    const getSortIcon = () => {
        return order === "asc" ? "Rosnąco" : "Malejąco";
    };

    const toggleDetails = (id: number) => {
        setExpandedTransactionIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
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
        <div className="p-4 space-y-6 max-w-[1800px] justify-center mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4">Transakcje cykliczne</h1>

            <div className="flex justify-end items-center w-full sm:w-1/2 mx-auto flex-wrap gap-3 h-full">
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
            {isLoading && recurringTransactions.length === 0 ? (
                <Loader/>
            ) : (
                <>
                    {recurringTransactions.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 w-full sm:w-1/2 mx-auto">
                                {recurringTransactions.map((recurringTransaction) => (
                                    <div
                                        key={recurringTransaction.id}
                                        className="relative flex flex-col items-start px-6 pb-6 pt-2 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-2xl rounded-2xl"
                                    >
                                        <div className="flex justify-end items-center w-full">
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
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="flex flex-row gap-4 justify-between w-full flex-wrap">
                                            <div>
                                                <p className="text-lg font-bold">{recurringTransaction.category_name}</p>
                                            </div>
                                            <div>
                                                <p
                                                    className={`text-lg font-bold ${
                                                        recurringTransaction.type === "Outcome"
                                                            ? "text-error"
                                                            : recurringTransaction.type === "Income"
                                                                ? "text-success"
                                                                : "text-tertiary"
                                                    }`}
                                                >
                                                    {`${recurringTransaction.amount.toFixed(2)} PLN`}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-row gap-4 justify-between w-full flex-wrap">
                                            <p className="text-sm text-wrap flex-1 min-w-[80px]">{recurringTransaction.description}</p>
                                            <p className="text-sm flex-none">{translateTransactionType(recurringTransaction.type)}</p>
                                        </div>

                                        <div className="w-full">
                                            {recurringTransaction.type === "Internal" ? (
                                                <p className="text-md font-semibold">
                                                    {recurringTransaction.account_name}
                                                    <span className="mx-1">→</span>
                                                    {recurringTransaction.account_2_name}
                                                </p>
                                            ) : (
                                                <p className="text-md font-semibold">{recurringTransaction.account_name}</p>
                                            )}
                                        </div>

                                        <hr className="w-full mt-4"/>

                                        <div className="w-full mt-4 space-y-2 flex flex-col justify-center">
                                            <button
                                                onClick={() => toggleDetails(recurringTransaction.id)}
                                                className="text-xl font-semibold text-secondary hover:scale-125  transform transition-all  duration-300"
                                            >
                                                {expandedTransactionIds.includes(recurringTransaction.id)
                                                    ? <FontAwesomeIcon icon={faArrowUp}/>
                                                    : <FontAwesomeIcon icon={faArrowDown}/>}
                                            </button>

                                            {expandedTransactionIds.includes(recurringTransaction.id) && (
                                                <div className="flex flex-col justify-start w-full">
                                                    <div className="flex justify-between mb-2">
                                                        <p className="text-sm font-semibold">Data rozpoczęcia</p>
                                                        <p className="text-sm">
                                                            {new Date(recurringTransaction.start_date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between mb-2">
                                                        <p className="text-sm font-semibold">Kolejna płatność</p>
                                                        <p className="text-sm">
                                                            {new Date(recurringTransaction.next_occurrence).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between mb-2">
                                                        <p className="text-sm font-semibold">Częstotliwość</p>
                                                        <p className="text-sm">
                                                            {translateRecurringType(recurringTransaction.recurring_frequency)}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
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
                        <p className="text-center text-xl">Brak transakcji cyklicznych.</p>
                    )}
                </>
            )}
        </div>
    );
};


export default RecurringTransactionsPage;
