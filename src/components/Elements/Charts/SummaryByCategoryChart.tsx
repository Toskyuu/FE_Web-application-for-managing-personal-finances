import React, {useEffect, useState} from 'react';
import {Pie} from 'react-chartjs-2';
import {format, parseISO} from 'date-fns';
import {translateTransactionType} from "@/utils/Translators.tsx";

interface SummaryByCategoryChartProps {
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

const generateRandomColors = (count: number) => {
    return Array.from({length: count}, () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.8)`;
    });
};

const SummaryByCategoryChart: React.FC<SummaryByCategoryChartProps> = ({
                                                                           data,
                                                                           start_date,
                                                                           end_date,
                                                                           type,
                                                                       }) => {
    const [legendPosition, setLegendPosition] = useState<'top' | 'right'>('right');

    const mappedData = data.map((item) => ({
        category: item.category,
        value: type == 'Income' ? item.incomes : item.expenses,
        count: type == 'Income' ? item.income_count : item.expense_count,
    }));


    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            setLegendPosition(e.matches ? 'top' : 'right');
        };
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        setLegendPosition(mediaQuery.matches ? 'top' : 'right');

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    const labels = mappedData.map((item) => item.category);
    const values = mappedData.map((item) => item.value);
    const counts = mappedData.map((item) => item.count);

    const colors = generateRandomColors(mappedData.length);

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: colors,
                borderColor: '#ffffff',
                borderWidth: 2,
            },

        ],
    };

    const theme = localStorage.getItem('theme');
    let textColor: string;
    if (theme === 'dark') {
        textColor = '#F7F5FB';
    } else {
        textColor = '#292929';
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                align: 'end' as const,
                display: true,
                text: [`${type == 'Income' ? 'Przychody' : 'Wydatki'}`,
                    `Okres`,
                    `${format(
                        parseISO(start_date),
                        'dd.MM.yyyy'
                    )} - ${format(parseISO(end_date), 'dd.MM.yyyy')}`],
                font: {
                    size: 15,
                },
                color: textColor,
            },
            legend: {
                position: legendPosition,
                labels: {
                    font: {
                        size: 26,
                    },
                    color: textColor,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const category = tooltipItem.label;
                        const value = tooltipItem.raw;
                        const index = tooltipItem.dataIndex;
                        const count = counts[index];

                        return [
                            `Kategoria: ${category}`,
                            `${translateTransactionType(type)}: ${value} zł`,
                            `Liczba transakcji: ${count}`,
                        ];
                    },
                },
            },
            datalabels: {
                display: false,
            },

        },
    };

    return <Pie data={chartData} options={options}/>;
};

export default SummaryByCategoryChart;
