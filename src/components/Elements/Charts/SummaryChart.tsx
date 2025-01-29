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
                backgroundColor: ['#BC4B51', '#4cd684'],
                borderRadius: 8,
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
                text: [`Okres`, `${format(
                    parseISO(start_date),
                    'dd.MM.yyyy'
                )} - ${format(parseISO(end_date), 'dd.MM.yyyy')}`],
                font: {
                    size: 15,
                },
                color: textColor,
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
            datalabels: {
                anchor: 'end' as const,
                align: 'top' as const,
                formatter: (value: number) => {
                    if (value === 0) return '';
                    return `${value} zł`;
                },
                color: textColor,
                font: {
                    weight: 'bold' as const,
                    size: 15,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false,
                    drawBorder: true,
                },
                ticks: {
                    color: textColor,
                    font: {
                        size: 15,
                    }
                },

            },
            y: {
                grid: {
                    drawOnChartArea: false,
                    drawBorder: true,
                },
                ticks: {
                    color: textColor,
                    font: {
                        size: 15,
                    }
                },

                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default SummaryChart;
