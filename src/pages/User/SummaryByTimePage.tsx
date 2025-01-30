import React, {useEffect, useState} from 'react';
import {DefaultButton, MainCard, SummaryByTimeChart} from '@/components';
import {fetchSummaryByTime} from '@/API/StatsAPI';
import {useToast} from "@/hooks/useToast.tsx";
import {useFilters} from "@/hooks/useFilters.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {FilterSummaryByTimeForm} from "@/components";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";

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
    const {refreshKey} = useRefresh();


    const loadTransactionsOverTime = async (filters: any) => {
        try {
            setLoading(true);
            const response = await fetchSummaryByTime(filters);
            setData(response.data);
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransactionsOverTime(transactionOverTimeFilters);
    }, [transactionOverTimeFilters, refreshKey]);

    return (
        <div className="grid grid-cols-1 gap-6 w-full sm:w-3/4  mx-auto">
            <h1 className="text-2xl font-bold text-center ">Wydatki i przychody na przestrzeni czasu</h1>

            <div className="flex justify-end">
                <DefaultButton
                    onClick={() =>
                        openModal(<FilterSummaryByTimeForm/>)
                    }
                    text="Filtry"
                    bgColor="bg-secondary"
                    color="text-text-dark"
                    padding="p-3"
                    radius="rounded-2xl"
                    fontSize=""
                    minwidth="w-full h-12"
                />
            </div>

            <MainCard fontSize="text-lg" padding="p-5" height="h-auto" width="w-auto">
                {loading ? (
                    <Loader/>
                ) : data ? (
                    <div className="aspect-[2/3] sm:aspect-[2/1] w-auto ">
                        <SummaryByTimeChart data={data} interval={transactionOverTimeFilters.interval}/>
                    </div>
                ) : (
                    <p>Brak danych.</p>
                )}
            </MainCard>
        </div>
    );
};

export default SummaryByTimePage;
