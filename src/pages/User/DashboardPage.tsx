import React, {useEffect, useState} from 'react';
import {MainCard, SummaryByTimeChart} from '@/components';
import {useToast} from '@/hooks/useToast.tsx';
import {fetchDashboard} from '@/API/DashboardAPI.tsx';
import {useRefresh} from '@/hooks/useRefresh.tsx';
import Loader from '@/components/Elements/Loader/Loader.tsx';
import {translateAccountType, translateMonth} from "@/utils/Translators.tsx";

interface DashboardData {
    accounts: {
        accounts: {
            id: number;
            name: string;
            user_id: number;
            balance: number;
            initial_balance: number;
            type: string;
        }[];
        current_page: number;
        total_pages: number;
    };
    incomes_expenses_summary: {
        expenses: number;
        incomes: number;
        expense_count: number;
        income_count: number;
        start_date: string;
        end_date: string;
    };
    transactions: {
        transactions: {
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
        }[];
        current_page: number;
        total_pages: number;
    };
    budgets: {
        budgets: {
            id: number;
            limit: number;
            user_id: number;
            month_year: string;
            category_id: number;
            category_name: string;
            spent_in_budget: number;
            spent_to_limit_ratio: number;
        }[];
        current_page: number;
        total_pages: number;
    };
    expenses: {
        data: {
            time_group: string;
            expenses: number;
            incomes: number;
        }[];
        total_count: number;
    };
}

const DashboardPage: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {refreshKey} = useRefresh();
    const {showToast} = useToast();

    const loadDashboard = async () => {
        setLoading(true);
        try {
            const response: DashboardData = await fetchDashboard();
            setData(response);
        } catch (error: any) {
            showToast(error, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, [refreshKey]);

    return (
        <div className="p-4 mx-auto flex max-w-[1800px] justify-center">
            <div className="p-5 h-auto sm:w-3/4 w-full text-lg  ">
                {loading ? (
                    <Loader/>
                ) : data ? (
                    <div className="grid xl:grid-cols-7 md:grid-cols-4 grid-cols-1 gap-6">

                        <div className="md:col-span-2 col-span-1 row-span-3">
                            <MainCard fontSize="text-lg" padding="" height="h-full" width="w-auto">
                                <div
                                    className="text-text-dark relative top-0 w-full h-10 bg-secondary rounded-t-2xl flex items-center pl-5 text-left border-b-2 dark:border-background-light border-background-dark">
                                    <p className="text-xl">Podsumowanie</p>
                                </div>

                                <div className="flex flex-col flex-1 p-5 h-full">
                                    <div
                                        className="text-xl font-bold">{translateMonth(data.incomes_expenses_summary.start_date)} {data.incomes_expenses_summary.start_date.slice(0, 4)}</div>
                                    <div className="flex flex-col items-center justify-center w-full py-3">
                                        <div className="flex justify-between items-center w-full flex-wrap gap-3 py-3">
                                            <div className="text-xl font-bold text-error">Wydatki</div>
                                            <div
                                                className="flex flex-col items-end">
                                                <div className="text-lg">{data.incomes_expenses_summary.expenses} zł
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="w-full"/>
                                        <div className="flex justify-between items-center w-full flex-wrap gap-3 py-3">
                                            <div className="text-xl font-bold text-success">Przychody</div>
                                            <div
                                                className="flex flex-col items-end">
                                                <div className="text-lg">{data.incomes_expenses_summary.incomes} zł
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="w-full"/>
                                        <div className="flex justify-between items-center w-full flex-wrap gap-3 py-3">
                                            <div className="text-xl font-bold text-secondary">Łącznie</div>
                                            <div
                                                className="flex flex-col items-end">
                                                <div
                                                    className="text-lg">{data.incomes_expenses_summary.incomes - data.incomes_expenses_summary.expenses} zł
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MainCard>

                        </div>

                        <div
                            className="md:col-span-2 col-span-1 xl:col-start-6 md:col-start-3 col-start-1 xl:row-span-8 row-span-5">
                            <MainCard fontSize="text-lg" padding="" height="h-full" width="w-auto">
                                <div
                                    className="text-text-dark relative top-0 w-full h-10 bg-secondary rounded-t-2xl flex items-center pl-5 text-left border-b-2 dark:border-background-light border-background-dark ">
                                    <p className="text-xl ">Budżety</p>
                                </div>
                                <div className="p-5 flex flex-col flex-1 h-full">

                                    {data.budgets.budgets.map((budget, index) => (
                                        <div key={budget.id}>
                                            <div className="py-3">
                                                <div className="flex justify-between items-center pb-2">
                                                    <div className="flex flex-col text-start">
                                                        <p className="font-bold text-xl">{budget.category_name}</p>
                                                    </div>
                                                    <div className="flex flex-col text-end">
                                                        <p>Limit</p>
                                                        <p> {budget.limit} zł</p>

                                                        <p className="text-sm ">
                                                            {translateMonth(budget.month_year)} {budget.month_year.slice(0, 4)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-sm mb-1">{budget.spent_in_budget} zł</p>
                                                <div className="w-full bg-background-dark rounded-full h-4 ">
                                                    <div
                                                        className={`${budget.spent_to_limit_ratio >= 100 ? 'bg-error' : 'bg-success'} h-4 rounded-full`}
                                                        style={{width: `${Math.min(budget.spent_to_limit_ratio, 100)}%`}}
                                                    ></div>
                                                </div>
                                                <p className="text-sm mt-1">{Math.round(budget.spent_to_limit_ratio)}%</p>
                                            </div>
                                            {index < data.budgets.budgets.length - 1 && <hr className="w-full"/>}
                                        </div>
                                    ))}
                                </div>
                            </MainCard>
                        </div>

                        <div
                            className="xl:col-span-3 md:col-span-2 col-span-1 md:col-start-3  row-span-3 md:row-start-1 row-start-4 ">
                            <MainCard fontSize="text-lg" padding="" height="h-full" width="w-auto">
                                <div
                                    className="text-text-dark relative top-0 w-full h-10 bg-secondary rounded-t-2xl flex items-center pl-5 text-left border-b-2 dark:border-background-light border-background-dark ">
                                    <p className="text-xl ">Konta</p>
                                </div>
                                <div className="p-5 flex flex-col flex-1 max-h-full ">

                                    <div className="flex-1 scrollbar-custom max-h-full ">
                                        {data.accounts.accounts.map((account, index) => (
                                            <div key={account.id}>
                                                <div className="flex justify-between items-center flex-wrap gap-3 py-3">
                                                    <div className="flex flex-col text-start flex-wrap ">
                                                        <p className="font-semibold text-lg">{account.name}</p>
                                                        <p className="text-sm">{translateAccountType(account.type)}</p>
                                                    </div>
                                                    <div className={`text-2xl font-bold text-right ${account.balance > 0
                                                        ? 'text-success' : account.balance < 0 ? 'text-error' : 'dark:text-text-dark text-text-light'}`}>{account.balance} zł
                                                    </div>
                                                </div>
                                                {index < data.accounts.accounts.length - 1 && <hr className="w-full"/>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </MainCard>
                        </div>

                        <div
                            className="xl:col-span-3 md:col-span-4 col-span-1 xl:col-start-3 md:col-start-1  row-span-5 xl:row-start-4 md:row-start-9">
                            <MainCard fontSize="text-lg" padding="" height="h-full" width="w-auto">
                                <div
                                    className=" text-text-dark relative top-0 w-full h-10 bg-secondary rounded-t-2xl flex items-center pl-5 text-left border-b-2 dark:border-background-light border-background-dark ">
                                    <p className="text-xl ">Wykres wydatków</p>
                                </div>
                                <div className="p-5 flex flex-col flex-1 h-full ">
                                    <div className="h-[65vh] w-auto">
                                        <SummaryByTimeChart data={data.expenses.data} interval="Daily"/>
                                    </div>
                                </div>
                            </MainCard>
                        </div>

                        <div className="md:col-span-2  md:row-start-4  row-start-7 col-span-1 row-span-5 ">
                            <MainCard fontSize="text-lg" padding="" height="h-full"
                                      width="w-auto">
                                <div
                                    className="text-text-dark relative top-0 w-full h-10 bg-secondary rounded-t-2xl flex items-center pl-5 text-left border-b-2 dark:border-background-light border-background-dark ">
                                    <p className="text-xl ">Ostatnie transakcje</p>
                                </div>
                                <div className="p-5 flex flex-col flex-1 h-full ">

                                    {data.transactions.transactions.map((transaction, index) => (
                                        <div key={transaction.id}>
                                            <div className="py-3">
                                                <div className="flex justify-between items-center gap-3 py-2">
                                                    <div className="flex flex-col text-start">
                                                        <p className="text-lg font-semibold">{transaction.category_name}</p>
                                                        {transaction.type === "Internal" ? (
                                                            <p className="text-sm ">
                                                                {transaction.account_name} &rarr; {transaction.account_2_name!}
                                                            </p>
                                                        ) : (
                                                            <p className="text-sm ">{transaction.account_name}</p>
                                                        )}
                                                    </div>

                                                    <div className={"flex flex-col text-end"}>
                                                        <p className={`text-2xl font-bold ${transaction.type === 'Outcome'
                                                            ? 'text-error' : transaction.type === 'Income' ? 'text-success' : 'text-secondary'}`}>
                                                            {transaction.amount} zł
                                                        </p>
                                                        <p className="text-sm ">
                                                            {new Date(transaction.transaction_date).toLocaleDateString('pl-PL')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {index < data.transactions.transactions.length - 1 &&
                                                <hr className="w-full"/>}
                                        </div>
                                    ))}
                                </div>
                            </MainCard></div>

                    </div>
                ) : (
                    <p>Brak danych do wyświetlenia :(</p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;


