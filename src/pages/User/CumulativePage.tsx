import React, {useEffect, useState} from 'react';
import {CumulativeChart, MainCard} from '@/components';
import {fetchCumulative} from '@/API/StatsAPI';
import {useToast} from '@/hooks/useToast.tsx';
import {useFilters} from '@/hooks/useFilters.tsx';
import {useModal} from '@/hooks/useModal.tsx';
import {FilterSummaryByCategoryForm} from '@/components';

interface CumulativeData {
    data: {
        date: string;
        cumulative_income: number;
        cumulative_expense: number;
        cumulative_income_count: number;
        cumulative_expense_count: number;
    }[];
    start_date: string;
    end_date: string;
}

const CumulativePage: React.FC = () => {
    const [data, setData] = useState<CumulativeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const {showToast} = useToast();
    const {transactionSummaryFilters} = useFilters();
    const {openModal} = useModal();

    const loadCumulative = async (filters: any) => {
        try {
            setLoading(true);
            const response = await fetchCumulative(filters);
            setData(response);
        } catch (error: any) {
            showToast(error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCumulative(transactionSummaryFilters);
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
                        <CumulativeChart
                            data={data.data}
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

export default CumulativePage;
