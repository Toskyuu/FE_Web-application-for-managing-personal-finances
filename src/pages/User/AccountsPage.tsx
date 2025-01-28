import React, {useState, useEffect} from "react";
import {translateAccountType} from "@/utils/Translators.tsx";
import {AccountForm, DropDownMenu} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {deleteAccount, fetchAccounts} from "@/API/AccountAPI.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {useData} from "@/hooks/useData.tsx";

interface Account {
    id: number;
    name: string;
    user_id: number;
    balance: number;
    initial_balance: number;
    type: string;
}

interface AccountResponse {
    accounts: Account[];
    current_page: number;
    total_pages: number;
}

const AccountsPage: React.FC = () => {
        const [accounts, setAccounts] = useState<Account[]>([]);
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


        const loadAccounts = async (
            page: number,
            size: number,
            sortBy: string,
            order: "asc" | "desc"
        ) => {
            setIsLoading(true);
            try {
                const data: AccountResponse = await fetchAccounts(page, size, sortBy, order);
                setTotalPages(data.total_pages);
                setAccounts((prev) => (page === 1 ? data.accounts : [...prev, ...data.accounts]));
            } catch (error: any) {
                showToast(error, "error")
            } finally {
                setIsLoading(false);
            }
        };

        useEffect(() => {
            loadAccounts(page, size, sortBy, order);
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

        const handleEditAccount = (id: number, name: string, initialBalance: number, type: string) => {
            closeModal();
            openModal(<AccountForm id={id} name={name} initial_balance={initialBalance} type={type}/>)
        };

        const handleDeleteAccount = async (accountId: number) => {
            closeModal();
            openModal(
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-xl font-bold">Czy na pewno chcesz usunąć to konto?</h2>
                    <div className="flex space-x-4">
                        <button
                            className="px-6 py-2 bg-error text-white rounded-lg hover:bg-error-dark"
                            onClick={async () => {
                                try {
                                    let response = await deleteAccount(accountId, fetchData);
                                    showToast(response, "success");
                                    forceRefresh();
                                } catch (error: any) {
                                    showToast(error, "error");
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
                <h1 className="text-4xl font-bold text-center mb-4 ">Konta</h1>

                <div className="flex justify-end items-center w-full sm:w-3/4 mx-auto space-x-4">
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setAccounts([]);
                            setPage(1);
                        }}
                        className="p-3 rounded-2xl shadow-2xl bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                    >
                        <option value="id">ID</option>
                        <option value="name">Nazwa</option>
                        <option value="type">Typ</option>
                        <option value="balance">Saldo</option>
                        <option value="initial_balance">Saldo początkowe</option>

                    </select>
                    <button
                        onClick={toggleSortOrder}
                        className="p-3 sticky rounded-2xl shadow-2xl bg-secondary text-text-dark"
                    >
                        {getSortIcon()}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full sm:w-3/4 mx-auto">
                    {accounts.map((account) => (
                        <div
                            key={account.id}
                            className="relative flex flex-col items-start p-6 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-2xl rounded-2xl space-y-4"
                        >
                            <div className="absolute top-0 right-4">
                                <DropDownMenu
                                    options={[
                                        {
                                            label: "Edytuj konto",
                                            onClick: () => handleEditAccount(account.id, account.name, account.initial_balance, account.type),
                                        },
                                        {
                                            label: "Usuń konto",
                                            onClick: () => handleDeleteAccount(account.id),
                                        },
                                    ]}
                                />
                            </div>

                            <p className="text-2xl font-bold">{account.name}</p>
                            <hr className="w-full"/>
                            <div className="py-3">
                                <p className="text-md">{translateAccountType(account.type)}</p>
                                <p className="text-md text-success">Saldo: {`${account.balance.toFixed(2)} PLN`}</p>
                                <p className="text-md">Saldo początkowe: {`${account.initial_balance.toFixed(2)} PLN`}</p>
                            </div>
                        </div>
                    ))}

                </div>

                {isLoading && <p className="text-center">Ładowanie...</p>}

                {!isLoading && accounts.length === 0 && (
                    <p className="text-center text-gray-500">Aktualnie nie ma jeszcze tutaj żadnych kont.</p>
                )}


                {page < totalPages && !isLoading && accounts.length > 0 && (
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
    }
;

export default AccountsPage;
