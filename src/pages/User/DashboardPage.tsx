import React, {useEffect, useState} from 'react';
import {MainCard} from '@/components';
import {fetchSummary} from '@/API/StatsAPI';
import {useToast} from '@/hooks/useToast.tsx';
import {useFilters} from '@/hooks/useFilters.tsx';
import {useModal} from '@/hooks/useModal.tsx';
import {FilterSummaryByCategoryForm} from '@/components';
import {SummaryChart} from '@/components';

interface SummaryData {
    expenses: number;
    incomes: number;
    expense_count: number;
    income_count: number;
    start_date: string;
    end_date: string;
}

const DashboardPage: React.FC = () => {
    const [data, setData] = useState<SummaryData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const {showToast} = useToast();
    const {transactionSummaryFilters} = useFilters();
    const {openModal} = useModal();

    const loadSummary = async (filters: any) => {
        try {
            setLoading(true);
            const response = await fetchSummary(filters);
            setData(response);
        } catch (error: any) {
            showToast(error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSummary(transactionSummaryFilters);
    }, [transactionSummaryFilters]);

    return (
        <MainCard fontSize="text-lg" padding="p-5" height="h-auto" width="w-auto">
            {loading ? (
                <p>Loading chart data...</p>
            ) : data ? (
                <div className="p-3">
                    <button
                        onClick={() => openModal(<FilterSummaryByCategoryForm/>)}
                        className="p-3 rounded-2xl shadow-2xl bg-secondary text-text-dark"
                    >
                        Filtry
                    </button>
                    <div className="flex items-center justify-center mb-20">
                        <SummaryChart
                            expenses={data.expenses}
                            incomes={data.incomes}
                            expense_count={data.expense_count}
                            income_count={data.income_count}
                            start_date={data.start_date}
                            end_date={data.end_date}
                        />
                    </div>
                </div>
            ) : (
                <p>No data available for the selected filters.</p>
            )}
        </MainCard>
    );
};

export default DashboardPage;
