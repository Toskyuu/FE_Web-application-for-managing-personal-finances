import React, {useEffect, useState} from "react";
import {MainCard} from "@/components";
import apiClient from "@/lib/apiClient.tsx";
import {translateTransactionType} from "@/utils/Translators.tsx";

interface Transaction {
    id: number;
    category_id: number;
    account_id: number;
    account_id_2: number;
    user_id: number;
    date: string;
    type: string;
    amount: number;
}

const TransactionCard: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await apiClient.post("/transactions/transactions", {});
                setTransactions(response.data);
                setLoading(false);
            } catch (err) {
                setError("Nie udało się pobrać danych transakcji.");
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <MainCard fontSize="text-base" padding="p-6" height="h-auto" width="w-full">
            <h2 className="text-xl font-bold mb-4">Ostatnie Transakcje</h2>

            {loading && <p>Ładowanie danych...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="flex flex-col gap-4">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex flex-col border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-md font-semibold">Kategoria: {transaction.category_id}</p>
                                <p className="text-lg font-bold">{transaction.amount.toFixed(2)} PLN</p>
                            </div>
                            <div className="flex justify-between items-center mb-2 ">
                                <p className="text-md text-gray-600 dark:text-gray-400">
                                    Data: {new Date(transaction.date).toLocaleDateString("pl-PL")}

                                </p>

                            </div>
                            <div className="flex justify-between items-center mb-2 ">
                                <p className="text-md text-gray-600 dark:text-gray-400">
                                    Typ: {translateTransactionType(transaction.type)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </MainCard>

    );
};

export default TransactionCard;
