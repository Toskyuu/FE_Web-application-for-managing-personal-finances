import React, {useEffect, useState} from 'react';
import {MainCard, SummaryByTimeChart} from '@/components';
import {fetchSummaryByTime} from '@/API/StatsAPI';
import {useToast} from "@/hooks/useToast.tsx";
import {useFilters} from "@/hooks/useFilters.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {FilterSummaryByTimeForm} from "@/components";

interface SummaryByTimeData {
    time_group: string;
    expenses: number;
    incomes: number;
}

const SummaryByTimePage: React.FC = () => {
    const [data, setData] = useState<SummaryByTimeData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {showToast} = useToast();
    const {transactionOverTimeFilters} = useFilters();
    const {openModal} = useModal();

    const loadTransactionsOverTime = async (filters: any) => {
        try {
            setLoading(true);
            const response = await fetchSummaryByTime(filters);
            setData(response.data);
        } catch (error: any) {
            showToast(error, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransactionsOverTime(transactionOverTimeFilters);
    }, [transactionOverTimeFilters]);

    return (
        <div className="grid grid-cols-1 gap-6 w-full sm:w-3/4 mx-auto">
            <h1 className="text-2xl font-bold text-center ">Wydatki i przychody na przestrzeni czasu</h1>

            <div className="flex justify-end">
                <button
                    onClick={() =>
                        openModal(<FilterSummaryByTimeForm/>)
                    }
                    className="p-3 rounded-2xl shadow-2xl bg-secondary text-text-dark hover:bg-secondary-dark"
                >
                    Filtry
                </button>
            </div>

            <MainCard fontSize="text-lg" padding="p-5" height="h-auto" width="w-auto">
                {loading ? (
                    <p>Loading chart data...</p>
                ) : data ? (
                    <div className="h-[60vh] w-auto ">
                        <SummaryByTimeChart data={data} interval={transactionOverTimeFilters.interval}/>
                    </div>
                ) : (
                    <p>No data available for the selected filters.</p>
                )}
            </MainCard>
        </div>
    );
};

export default SummaryByTimePage;
