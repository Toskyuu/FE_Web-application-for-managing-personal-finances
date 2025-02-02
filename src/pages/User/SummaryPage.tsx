import React, {useEffect, useState} from 'react';
import {DefaultButton, MainCard} from '@/components';
import {fetchSummary} from '@/API/StatsAPI';
import {useToast} from '@/hooks/useToast.tsx';
import {useFilters} from '@/hooks/useFilters.tsx';
import {useModal} from '@/hooks/useModal.tsx';
import {FilterSummaryByCategoryForm} from '@/components';
import {SummaryChart} from '@/components';
import Loader from "@/components/Elements/Loader/Loader.tsx";
import {useRefresh} from "@/hooks/useRefresh.tsx";

interface SummaryData {
    expenses: number;
    incomes: number;
    expense_count: number;
    income_count: number;
    start_date: string;
    end_date: string;
}

const SummaryPage: React.FC = () => {
    const [data, setData] = useState<SummaryData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const {showToast} = useToast();
    const {transactionSummaryFilters} = useFilters();
    const {openModal} = useModal();
    const {refreshKey} = useRefresh();

    const loadSummary = async (filters: any) => {
        try {
            setLoading(true);
            const response = await fetchSummary(filters);
            setData(response);
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSummary(transactionSummaryFilters);
    }, [transactionSummaryFilters, refreshKey]);

    return (
        <div className="grid grid-cols-1 gap-6 w-full sm:w-3/4 mx-auto">
            <h1 className="text-2xl font-bold text-center ">Wydatki i przychody w sumie</h1>

            <div className="flex justify-end">
                <DefaultButton
                    onClick={() => openModal(<FilterSummaryByCategoryForm/>)}
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
                    <div className="aspect-[2/3] sm:aspect-[2/1]  w-auto ">
                        <SummaryChart
                            expenses={data.expenses}
                            incomes={data.incomes}
                            expense_count={data.expense_count}
                            income_count={data.income_count}
                            start_date={data.start_date}
                            end_date={data.end_date}
                        />
                    </div>
                ) : (
                    <p>Brak danych.</p>
                )}
            </MainCard>
        </div>
    );
};

export default SummaryPage;
