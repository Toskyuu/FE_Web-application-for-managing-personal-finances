import React, {useState, useEffect} from "react";
import {translateAccountType} from "@/utils/Translators.tsx";
import {AccountForm, DropDownMenu} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {deleteAccount, fetchAccounts} from "@/API/AccountAPI.tsx";
import {useToast} from "@/hooks/useToast.tsx";

interface Account {
    id: number;
    name: string;
    user_id: number;
    balance: number;
    initial_balance: number;
    type: string;
}

const AccountsPage: React.FC = () => {
        const [accounts, setAccounts] = useState<Account[]>([]);
        const [isLoading, setIsLoading] = useState(false);
        const [sortBy, setSortBy] = useState<string>("id");
        const [order, setOrder] = useState<"asc" | "desc">("desc");
        const {openModal, closeModal} = useModal();
        const {refreshKey} = useRefresh();
        const {forceRefresh} = useRefresh();
        const {showToast} = useToast();


        const handleOpenModal = (content: React.ReactNode) => {
            openModal(content);
        };

        const loadAccounts = async () => {
            setIsLoading(true);
            try {
                const data = await fetchAccounts(sortBy, order);
                setAccounts(data);
            } catch (error: any) {
                showToast(error, "error")
            } finally {
                setIsLoading(false);
            }
        };

        useEffect(() => {
            loadAccounts();
        }, [sortBy, order, refreshKey]);


        const toggleSortOrder = () => {
            setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
            setAccounts([]);
        };

        const getSortIcon = () => {
            return order === "asc" ? "Rosnąco" : "Malejąco";
        };

        const handleEditAccount = (id: number, name: string, initialBalance: number, type: string) => {
            handleOpenModal(<AccountForm id={id} name={name} initial_balance={initialBalance} type={type}/>)
        };

        const handleDeleteAccount = async (accountId: number) => {
            openModal(
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-xl font-bold">Czy na pewno chcesz usunąć to konto?</h2>
                    <div className="flex space-x-4">
                        <button
                            className="px-6 py-2 bg-error text-white rounded-lg hover:bg-error-dark"
                            onClick={async () => {
                                try {
                                    let response = await deleteAccount(accountId);
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

                {isLoading && (
                    <p className="text-center">Ładowanie...</p>
                )}
            </div>
        );
    }
;

export default AccountsPage;
