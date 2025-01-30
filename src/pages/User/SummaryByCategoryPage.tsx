import React, {useEffect, useState} from 'react';
import {DefaultButton, MainCard} from '@/components';
import {fetchSummaryByCategory} from '@/API/StatsAPI';
import {useToast} from "@/hooks/useToast.tsx";
import {useFilters} from "@/hooks/useFilters.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {FilterSummaryByCategoryForm} from "@/components";
import {SummaryByCategoryChart} from "@/components";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";

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
    const {refreshKey} = useRefresh();


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
    }, [transactionSummaryFilters, refreshKey]);

    return (
        <div className="grid grid-cols-1 gap-6 w-full sm:w-3/4  mx-auto">
            <h1 className="text-2xl font-bold text-center ">Wydatki i przychody według kategorii</h1>

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
            <MainCard fontSize="text-lg" padding="p-6" height="h-auto" width="w-auto">
                {loading ? (
                    <Loader/>
                ) : data ? (
                    <div className="aspect-[2/3] sm:aspect-[2/1]  w-auto">
                        <SummaryByCategoryChart
                            data={data.data}
                            start_date={data.start_date}
                            end_date={data.end_date}
                            type={data.type}
                        />
                    </div>
                ) : (
                    <p>Brak danych.</p>
                )}
            </MainCard>
        </div>
    );
};

export default SummaryByCategoryPage;
