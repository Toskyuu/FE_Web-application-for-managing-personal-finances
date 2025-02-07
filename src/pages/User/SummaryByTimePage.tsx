import React, {useEffect, useState} from 'react';
import {DefaultButton, MainCard, SummaryByTimeChart} from '@/components';
import {fetchSummaryByTime} from '@/API/StatsAPI';
import {useToast} from "@/hooks/useToast.tsx";
import {useFilters} from "@/hooks/useFilters.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {FilterSummaryByTimeForm} from "@/components";
import {useRefresh} from "@/hooks/useRefresh.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";
import {Helmet} from "react-helmet-async";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();


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

    const isEmpty = (data: SummaryByTimeData[]): boolean => {
        return data.every((item) =>
            (item.expenses === 0 || item.expenses === null) &&
            (item.incomes === 0 || item.incomes === null)
        );
    };

    return (
        <>
            <Helmet>
                <title>Transakcje według czasu | YourFinance</title>
                <meta name="description" content="Analizuj swoje finanse w ujęciu czasowym."/>
                <link rel="canonical" href="http://localhost:4173/summary-by-time"/>
            </Helmet>
            <div className="grid grid-cols-1 gap-6 w-full sm:w-3/4  mx-auto">
                <h1 className="text-2xl font-bold text-center ">Wydatki i przychody na przestrzeni czasu</h1>

                <div className="flex justify-between flex-wrap gap-3">
                    <div className=" gap-3 flex flex-wrap">
                        <button className="rounded-2xl bg-secondary text-text-dark hover:brightness-125 duration-300 p-3 h-12"
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
                        <button className="rounded-2xl bg-surface-light dark:bg-surface-dark hover:brightness-125 duration-300 p-3 h-12"
                                aria-label="Przejdź do strony wykresu transakcji skumulowanych"
                                onClick={() => {
                                    navigate("/cumulative");
                                }}>
                            Transakcje skumulowane
                        </button>
                    </div>
                    <DefaultButton
                        onClick={() =>
                            openModal(<FilterSummaryByTimeForm/>)
                        }
                        text=" Filtry"
                        bgColor=" bg-secondary"
                        color=" text-text-dark"
                        ariaLabel=" Filtry"
                        padding=" p-3"
                        radius=" rounded-2xl"
                        fontSize=""
                        minwidth=" w-full h-12"
                    />
                </div>

                <MainCard fontSize=" text-lg" padding=" p-5" height=" h-auto" width=" w-auto">
                    {loading ? (
                        <Loader/>
                    ) : data && !isEmpty(data) ? (
                        <div className=" aspect-[2/3] sm:aspect-[2/1] w-auto ">
                            <SummaryByTimeChart data={data} interval={transactionOverTimeFilters.interval}/>
                        </div>
                    ) : (
                        <p>Brak danych.</p>
                    )}
                </MainCard>
            </div>
        </>
    );
};

export default SummaryByTimePage;
