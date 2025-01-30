import React, {useState, useEffect} from "react";
import {translateAccountType} from "@/utils/Translators.tsx";
import {AccountForm, DefaultButton, DropDownMenu} from "@/components";
import {useModal} from "@/hooks/useModal.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import {deleteAccount, fetchAccounts} from "@/API/AccountAPI.tsx";
import {useToast} from "@/hooks/useToast.tsx";
import {useData} from "@/hooks/useData.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";

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
            showToast(error.message, "error")
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
                    <DefaultButton
                        bgColor=" bg-error"
                        color="text-text-dark"
                        onClick={async () => {
                            try {
                                let response = await deleteAccount(accountId, fetchData);
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
            <h1 className="text-4xl font-bold text-center mb-4 ">Konta</h1>


            <div className="flex justify-end items-center w-full lg:w-1/2 sm:w-3/4 mx-auto flex-wrap gap-3 h-full">
                <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setAccounts([]);
                        setPage(1);
                    }}
                    className="p-3 cursor-pointer rounded-2xl h-12 shadow-xl bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:outline-none transition-all duration-300 hover:brightness-90 dark:hover:brightness-125"
                >
                    <option value="id">ID</option>
                    <option value="name">Nazwa</option>
                    <option value="type">Typ</option>
                    <option value="balance">Saldo</option>
                    <option value="initial_balance">Saldo początkowe</option>
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

            {isLoading && accounts.length === 0 ? (
                <Loader/>
            ) : (
                <>
                    {accounts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2  gap-6 w-full lg:w-1/2 sm:w-3/4 mx-auto">
                                {accounts.map((account) => (
                                    <div
                                        key={account.id}
                                        className="relative flex flex-col items-start px-6 py-2 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark shadow-2xl rounded-2xl"
                                    >
                                        <div className="flex justify-end items-center w-full">
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
                                        <div className="flex flex-row gap-4 justify-between  w-full flex-wrap">
                                            <div className="w-full">
                                                <p className="md:text-2xl text-lg font-bold text-wrap text-center">{account.name}</p>
                                            </div>
                                            <hr className="w-full"/>
                                            <div className="flex flex-col justify-start w-full">
                                                <div className="flex justify-between mb-2">
                                                    <p className="text-sm font-semibold">Typ konta</p>
                                                    <p className="text-sm">{translateAccountType(account.type)}</p>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <p className="text-sm font-semibold">Saldo</p>
                                                    <p className="text-sm text-quinary">{`${account.balance.toFixed(2)} PLN`}</p>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <p className="text-sm font-semibold">Saldo początkowe</p>
                                                    <p className="text-sm">{`${account.initial_balance.toFixed(2)} PLN`}</p>
                                                </div>
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
                        <p className="text-center text-xl">Brak kont.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default AccountsPage;
