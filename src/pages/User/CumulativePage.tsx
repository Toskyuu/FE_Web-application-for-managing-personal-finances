import React, {useEffect, useState} from 'react';
import {CumulativeChart, MainCard} from '@/components';
import {fetchCumulative} from '@/API/StatsAPI';
import {useToast} from '@/hooks/useToast.tsx';
import {useFilters} from '@/hooks/useFilters.tsx';
import {useModal} from '@/hooks/useModal.tsx';
import {FilterSummaryByCategoryForm} from '@/components';
import {useRefresh} from "@/hooks/useRefresh.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";

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
    const {refreshKey} = useRefresh();

    const loadCumulative = async (filters: any) => {
        try {
            setLoading(true);
            const response = await fetchCumulative(filters);
            setData(response);
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCumulative(transactionSummaryFilters);
    }, [transactionSummaryFilters, refreshKey]);

    return (
        <div className="grid grid-cols-1 gap-6 w-full sm:w-3/4 mx-auto">
            <h1 className="text-2xl font-bold text-center ">Wydatki i przychody na przestrzeni czasu</h1>

            <div className="flex justify-end">
                <button
                    onClick={() => openModal(<FilterSummaryByCategoryForm/>)}
                    className="p-3 rounded-2xl shadow-2xl bg-secondary text-text-dark"
                >
                    Filtry
                </button>
            </div>
            <MainCard fontSize="text-lg" padding="p-5" height="h-auto" width="w-auto">
                {loading ? (
                    <Loader/>
                ) : data ? (
                    <div className="h-[60vh] w-auto">
                        <CumulativeChart
                            data={data.data}
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

export default CumulativePage;
