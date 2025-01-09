import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useData} from "@/hooks/useData.tsx";
import apiClient from "@/lib/apiClient.tsx";

interface FormData {
    description: string;
    amount: number;
    date: string;
    category_id: number;
    account_id: number;
    type: string;
    account_id_2?: number;
}

const TransactionForm: React.FC = () => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormData>();
    const [type, setType] = useState<string>("Income");
    const {accounts, categories} = useData();

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setValue("date", today);
    }, [setValue]);

    const onSubmit = async (data: FormData) => {
        try {
            const requestBody = {
                description: data.description,
                amount: data.amount,
                date: data.date,
                category_id: data.category_id,
                account_id: data.account_id,
                type: data.type,
                account_id_2: data.account_id_2 || null
            };

            const response = await apiClient.post('/transactions', requestBody);

            console.log('Transaction successfully created:', response.data);
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div>
                <label htmlFor="description" className="block">Opis</label>
                <input
                    id="description"
                    {...register("description", {required: "Opis jest wymagany"})}
                    className="w-full p-2 border bg-background-dark rounded"
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>

            <div>
                <label htmlFor="amount" className="block">Kwota</label>
                <input
                    id="amount"
                    type="number"
                    {...register("amount", {required: "Kwota jest wymagana", min: 0})}
                    className="w-full p-2 border bg-background-dark rounded"
                />
                {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
            </div>

            <div>
                <label htmlFor="date" className="block">Data</label>
                <input
                    id="date"
                    type="date"
                    {...register("date", {required: "Data jest wymagana"})}
                    className="w-full p-2 border  bg-background-dark rounded"
                />
                {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>

            <div>
                <label htmlFor="category_id" className="block">Kategoria</label>
                <select
                    id="category_id"
                    {...register("category_id", {required: "Kategoria jest wymagana"})}
                    className="w-full p-2 border bg-background-dark rounded"
                >
                    <option value="">Wybierz kategorię</option>
                    {categories.map((category: any) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
            </div>

            <div>
                <label htmlFor="account_id" className="block">Konto</label>
                <select
                    id="account_id"
                    {...register("account_id", {required: "Konto jest wymagane"})}
                    className="w-full p-2 border  bg-background-dark rounded"
                >
                    <option value="">Wybierz konto</option>
                    {accounts.map((account: any) => (
                        <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                </select>
                {errors.account_id && <p className="text-red-500">{errors.account_id.message}</p>}
            </div>

            <div>
                <label htmlFor="type" className="block">Typ transakcji</label>
                <select
                    id="type"
                    {...register("type")}
                    className="w-full p-2 border bg-background-dark rounded"
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value);
                        setValue("type", e.target.value);
                    }}
                >
                    <option value="Income">Przychód</option>
                    <option value="Outcome">Wydatek</option>
                    <option value="Internal">Przelew wewnętrzny</option>
                </select>
            </div>

            {type === "Internal" && (
                <div>
                    <label htmlFor="account_id_2" className="block">Drugie konto</label>
                    <select
                        id="account_id_2"
                        {...register("account_id_2", {required: "Drugie konto jest wymagane"})}
                        className="w-full p-2 border bg-background-dark rounded"
                    >
                        <option value="">Wybierz konto</option>
                        {accounts.map((account: any) => (
                            <option key={account.id} value={account.id}>{account.name}</option>
                        ))}
                    </select>
                    {errors.account_id_2 && <p className="text-red-500">{errors.account_id_2.message}</p>}
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded mt-4"
            >
                Dodaj transakcję
            </button>
        </form>
    );
};

export default TransactionForm;
