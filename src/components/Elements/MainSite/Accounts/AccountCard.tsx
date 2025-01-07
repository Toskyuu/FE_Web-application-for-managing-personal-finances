import React, { useEffect, useState } from "react";
import {MainCard} from "@/components";
import apiClient from "@/lib/apiClient.tsx";

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
                <div className="grid grid-cols-1 gap-4">
                    {accounts.map((account) => (
                        <div
                            key={account.id}
                            className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800"
                        >
                            <h3 className="text-lg font-semibold mb-2">{account.name}</h3>
                            <p>Typ: {account.type}</p>
                            <p>Saldo: {account.balance.toFixed(2)} PLN</p>
                        </div>
                    ))}
                </div>
            )}
        </MainCard>
    );
};

export default AccountsCard;
