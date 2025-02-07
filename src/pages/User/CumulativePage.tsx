import React, {useEffect, useState} from 'react';
import {CumulativeChart, DefaultButton, MainCard} from '@/components';
import {fetchCumulative} from '@/API/StatsAPI';
import {useToast} from '@/hooks/useToast.tsx';
import {useFilters} from '@/hooks/useFilters.tsx';
import {useModal} from '@/hooks/useModal.tsx';
import {FilterSummaryByCategoryForm} from '@/components';
import {useRefresh} from "@/hooks/useRefresh.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";
import {Helmet} from "react-helmet-async";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();

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
        <>
            <Helmet>
                <title>Transakcje skumulowane | YourFinance</title>
                <meta name="description" content="Obserwuj skumulowane wartości finansowe."/>
                <link rel="canonical" href="http://localhost:4173/cumulative"/>
            </Helmet>
            <div className="grid grid-cols-1 gap-6 w-full sm:w-3/4 mx-auto">
                <h1 className="text-2xl font-bold text-center ">Skumulowane wydatki i przychody</h1>

                <div className="flex justify-between flex-wrap gap-3">
                    <div className="gap-3 flex flex-wrap">
                        <button className="rounded-2xl bg-surface-light dark:bg-surface-dark hover:brightness-125 duration-300 p-3 h-12"
                                aria-label="Przejdź do strony wykresu transakcji według czasu"
                                onClick={() => {
                                    navigate("/summary-by-time");
                                }}>
                            Transakcje według czasu
                        </button>
                        <button className="rounded-2xl bg-surface-light dark:bg-surface-dark hover:brightness-125 duration-300 p-3 h-12"
                                aria-label="Przejdź do strony wykresu transakcji według kategorii"
                                onClick={() => {
                                    navigate("/summary-by-category");
                                }}>
                            Transakcje według kategorii
                        </button>
                        <button className="rounded-2xl bg-surface-light dark:bg-surface-dark hover:brightness-125 duration-300 p-3 h-12"
                                aria-label="Przejdź do strony wykresu ogólnego podsumowanie"
                                onClick={() => {
                                    navigate("/summary");
                                }}>
                            Ogólne podsumowanie
                        </button>
                        <button className="rounded-2xl bg-secondary text-text-dark hover:brightness-125 duration-300 p-3 h-12"
                                aria-label="Przejdź do strony wykresu transakcji skumulowanych"
                                onClick={() => {
                                    navigate("/cumulative");
                                }}>
                            Transakcje skumulowane
                        </button>
                    </div>
                    <DefaultButton
                        onClick={() => openModal(<FilterSummaryByCategoryForm/>)}
                        text="Filtry"
                        ariaLabel="Filtry"
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
                        <div className="aspect-[2/3] sm:aspect-[2/1]  w-auto">
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
        </>
    );
};

export default CumulativePage;
