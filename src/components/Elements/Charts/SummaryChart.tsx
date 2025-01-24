import React from 'react';
import {Bar} from 'react-chartjs-2';
import {format, parseISO} from 'date-fns';

interface SummaryChartProps {
    expenses: number;
    incomes: number;
    expense_count: number;
    income_count: number;
    start_date: string;
    end_date: string;
}

const SummaryChart: React.FC<SummaryChartProps> = ({
                                                       expenses,
                                                       incomes,
                                                       expense_count,
                                                       income_count,
                                                       start_date,
                                                       end_date,
                                                   }) => {
    const chartData = {
        labels: ['Wydatki', 'Przychody'],
        datasets: [
            {
                label: 'Kwota (zł)',
                data: [expenses, incomes],
                backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(75, 192, 192, 0.8)'],
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                align: 'end' as const,
                display: true,
                text: [`Okres`, `${format(
                    parseISO(start_date),
                    'dd.MM.yyyy'
                )} - ${format(parseISO(end_date), 'dd.MM.yyyy')}`],
                font: {
                    size: 15,
                },
            },
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const index = tooltipItem.dataIndex;
                        const value = tooltipItem.raw;
                        const count = index === 0 ? expense_count : income_count;
                        return [
                            `${tooltipItem.label}: ${value} zł`,
                            `Liczba transakcji: ${count}`,
                        ];
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false,
                    drawBorder: true,
                },

            },
            y: {
                grid: {
                    drawOnChartArea: false,
                    drawBorder: true,
                },

                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options}/>;
};

export default SummaryChart;
