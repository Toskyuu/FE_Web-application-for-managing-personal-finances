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
import {Helmet} from "react-helmet-async";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();

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
        <>
            <Helmet>
                <title>Podsumowanie finansowe | YourFinance</title>
                <meta name="description" content="Ogólne podsumowanie Twoich finansów."/>
                <link rel="canonical" href="http://localhost:4173/summary"/>
            </Helmet>
            <div className="grid grid-cols-1 gap-6 w-full sm:w-3/4 mx-auto">
                <h1 className="text-2xl font-bold text-center ">Wydatki i przychody w sumie</h1>

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
                        <button className="rounded-2xl bg-secondary text-text-dark hover:brightness-125 duration-300 p-3 h-12"
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
                    ) : data && data.incomes != 0 && data.expenses != 0 ? (
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
        </>
    );
};

export default SummaryPage;
