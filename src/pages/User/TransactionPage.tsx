import React, {useState, useEffect} from "react";
import {MainCard} from "@/components";
import apiClient from "@/lib/apiClient.tsx";
import {useData} from "@/hooks/useData.tsx";

interface Transaction {
    id: number;
    category_id: number;
    account_id: number;
    account_id_2?: number;
    user_id: number;
    date: string;
    type: "Outcome" | "Income" | "Internal";
    amount: number;
    description: string;
}

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const size = 10; // liczba transakcji na stronę
    const {categories, accounts} = useData();

    const fetchTransactions = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await apiClient.post("/transactions/transactions", {page, size});
            setTransactions((prev) => [...prev, ...response.data]);
            console.log(response);
        } catch (error) {
            console.error("Błąd podczas pobierania transakcji:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions(page);
    }, [page]);

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
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

    return (
        <div className="p-4 space-y-6">
            {/* Nagłówek */}
            <h1 className="text-2xl font-bold text-center mb-4">Transakcje</h1>

            {/* Lista transakcji */}
            {transactions.map((transaction) => (
                <MainCard
                    key={transaction.id}
                    fontSize="text-base"
                    padding="p-6"
                    height="h-auto"
                    width="w-full sm:w-3/4 mx-auto"
                >
                    <div
                        className={`flex flex-col md:flex-row items-start md:items-center border-l-4 ${getBorderColor(transaction.type)} pl-4`}>
                        <div className="flex-1">
                            {/* Kategoria (bez labelu) */}
                            <p className="font-semibold text-sm text-left">
                                {getCategoryName(transaction.category_id)}
                            </p>

                            {/* Jeśli to Internal: Konto 1 -> Konto 2 */}
                            {transaction.type === "Internal" ? (
                                <p className="mt-2 font-semibold text-sm text-left">
                                    {getAccountName(transaction.account_id)} &rarr; {getAccountName(transaction.account_id_2!)}
                                </p>
                            ) : (
                                // Jeśli to nie Internal, to nazwa konta
                                <p className="mt-2 font-semibold text-sm text-left">
                                    {getAccountName(transaction.account_id)}
                                </p>
                            )}

                            {/* Opis transakcji */}
                            <p className="mt-2 text-left">
                                {transaction.description}
                            </p>
                        </div>

                        <div className="flex flex-col items-end">
                            {/* Kwota po prawej stronie, z minusem dla 'Outcome' */}
                            <p className={`text-lg font-semibold ${transaction.type === "Outcome" ? "text-red-500" : "text-green-500"}`}>
                                {transaction.type === "Outcome" ? `- ${transaction.amount} PLN` : `${transaction.amount} PLN`}
                            </p>

                            {/* Data transakcji */}
                            <p className="mt-2 text-sm text-gray-500">
                                {new Date(transaction.date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </MainCard>
            ))}

            {/* Przyciski i ładowanie */
            }
            {
                isLoading ? (
                    <p className="text-center">Ładowanie...</p>
                ) : (
                    <button
                        onClick={loadMore}
                        className="block mx-auto mt-4 px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark"
                    >
                        Załaduj więcej
                    </button>
                )
            }
        </div>
    )
        ;
};

export default TransactionsPage;
