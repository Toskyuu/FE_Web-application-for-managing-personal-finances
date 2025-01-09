import React, { useEffect, useState } from "react";
import {MainCard} from "@/components";
import apiClient from "@/lib/apiClient.tsx";
import {translateAccountType} from "@/utils/Translators.tsx";

interface Account {
    id: number;
    name: string;
    type: string;
    balance: number;
}

const AccountsCard: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await apiClient.post("/accounts/accounts", {},
                    {
                       params: {user_id: 6}
                    });
                setAccounts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Nie udało się pobrać danych kont.");
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    return (
        <MainCard fontSize="text-base" padding="p-6" height="h-auto" width="w-full">
            <h2 className="text-xl font-bold mb-4">Lista Kont</h2>

            {loading && <p>Ładowanie danych...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="flex flex-col gap-4">
                    {accounts.map((account) => (
                        <div
                            key={account.id}
                            className="flex flex-col border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">{account.name}</h3>
                                <p className="text-lg font-bold">{account.balance.toFixed(2)} PLN</p>
                            </div>
                            <div className="flex items-center justify-items-start">
                            <p className="text-md text-gray-600 dark:text-gray-400">
                                Typ: {translateAccountType(account.type)}
                            </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </MainCard>

    );
};

export default AccountsCard;
