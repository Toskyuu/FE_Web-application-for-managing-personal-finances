import React, {useEffect, useState} from 'react';
import {MainCard} from '@/components';
import {fetchSummaryByCategory} from '@/API/StatsAPI';
import {useToast} from "@/hooks/useToast.tsx";
import {useFilters} from "@/hooks/useFilters.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {FilterSummaryByCategoryForm} from "@/components";
import {SummaryByCategoryChart} from "@/components";

interface SummaryByCategoryData {
    data: {
        category: string;
        expense_count: number;
        expenses: number;
        income_count: number;
        incomes: number;
    }[];
    start_date: string;
    end_date: string;
    type: string;
}

const SummaryByCategoryPage: React.FC = () => {
    const [data, setData] = useState<SummaryByCategoryData | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const {showToast} = useToast();
    const {transactionSummaryFilters} = useFilters();
    const {openModal} = useModal();

    const loadSummaryByCategory = async (filters: any) => {
        try {
            setLoading(true);
            const response = await fetchSummaryByCategory(filters);
            setData(response);
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSummaryByCategory(transactionSummaryFilters);
    }, [transactionSummaryFilters]);

    return (
        <div className="grid grid-cols-1 gap-6 w-full sm:w-3/4 mx-auto">
            <h1 className="text-2xl font-bold text-center ">Wydatki i przychody według kategorii</h1>

            <div className="flex justify-end">
                <button
                    onClick={() =>
                        openModal(<FilterSummaryByCategoryForm/>)
                    }
                    className="p-3 rounded-2xl shadow-2xl bg-secondary text-text-dark"
                >
                    Filtry
                </button>
            </div>
            <MainCard fontSize="text-lg" padding="p-6" height="h-auto" width="w-auto">
                {loading ? (
                    <p>Loading chart data...</p>
                ) : data ? (
                    <div className="h-[60vh] w-auto">
                        <SummaryByCategoryChart
                            data={data.data}
                            start_date={data.start_date}
                            end_date={data.end_date}
                            type={data.type}
                        />
                    </div>
                ) : (
                    <p>No data available for the selected filters.</p>
                )}
            </MainCard>
        </div>
    );
};

export default SummaryByCategoryPage;
