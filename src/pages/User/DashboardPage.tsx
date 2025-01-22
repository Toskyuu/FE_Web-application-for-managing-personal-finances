import React, { useEffect, useState } from 'react';
import { MainCard } from '@/components';
import { fetchSummaryByCategory } from '@/API/StatsAPI';
import { useToast } from "@/hooks/useToast.tsx";
import { useFilters } from "@/hooks/useFilters.tsx";
import { useModal } from "@/hooks/useModal.tsx";
import { FilterSummaryByCategoryForm } from "@/components";
import SummaryByCategoryChart from "@/components/Elements/Charts/SummaryByCategoryChart.tsx";

const DashboardPage: React.FC = () => {
    const [data, setData] = useState<{
        data: {
            category: string;
            expense_count: number;
            expenses: number;
            incomes_count: number;
            incomes: number;
        }[];
        start_date: string;
        end_date: string;
        type: string;
    }>({
        data: [],
        start_date: '',
        end_date: '',
        type: '',
    });

    const [loading, setLoading] = useState<boolean>(true);
    const { showToast } = useToast();
    const { transactionSummaryFilters } = useFilters();
    const { openModal } = useModal();

    const loadSummaryByCategory = async (filters: any) => {
        try {
            setLoading(true);
            const response = await fetchSummaryByCategory(filters);
            setData(response);
        } catch (error: any) {
            showToast(error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSummaryByCategory(transactionSummaryFilters);
    }, [transactionSummaryFilters]);

    return (
        <MainCard fontSize="text-lg" padding="p-6" height="h-1/2" width="w-auto">
            {loading ? (
                <p>Loading chart data...</p>
            ) : data.data.length ? (
                <>
                    <button
                        onClick={() =>
                            openModal(<FilterSummaryByCategoryForm />)
                        }
                        className="p-3 rounded-2xl shadow-2xl bg-secondary text-text-dark"
                    >
                        Filtry
                    </button>
                    <div className="flex items-center justify-center h-auto">
                        <SummaryByCategoryChart
                            data={data.data}
                            start_date={data.start_date}
                            end_date={data.end_date}
                            type={data.type}
                        />
                    </div>
                </>
            ) : (
                <p>No data available for the selected filters.</p>
            )}
        </MainCard>
    );
};

export default DashboardPage;
