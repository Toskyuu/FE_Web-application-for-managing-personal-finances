import React, {useEffect, useState} from 'react';
import {MainCard, TransactionsOverTimeChart} from '@/components';
import {fetchTransactionsOverTime} from '@/API/StatsAPI';
import {useToast} from "@/hooks/useToast.tsx";
import {useFilters} from "@/hooks/useFilters.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {FilterTransactionOverTimeForm} from "@/components";

const Dashboard: React.FC = () => {
    const [data, setData] = useState<
        { time_group: string; expenses: number; incomes: number }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);
    const {showToast} = useToast();
    const {transactionOverTimeFilters} = useFilters();
    const {openModal} = useModal();

    const loadTransactionsOverTime = async (filters: any) => {
        try {
            setLoading(true);
            const response = await fetchTransactionsOverTime(filters);
            setData(response.data);
        } catch (error: any) {
            showToast(error.message, "error");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        loadTransactionsOverTime(transactionOverTimeFilters);
    }, [transactionOverTimeFilters]);

    return (
        <MainCard fontSize="text-lg" padding="p-6" height="h-auto" width="w-full">

            {loading ? (
                <p>Loading chart data...</p>
            ) : data.length ? (
                <>
                    <button
                        onClick={() =>
                            openModal(<FilterTransactionOverTimeForm/>)
                        }
                        className="p-3 rounded-2xl shadow-2xl bg-secondary text-text-dark"
                    >
                        Filtry
                    </button>
                    <TransactionsOverTimeChart data={data} interval={transactionOverTimeFilters.interval}/>
                </>

            ) : (
                <p>No data available for the selected filters.</p>
            )}
        </MainCard>
    );
};

export default Dashboard;
