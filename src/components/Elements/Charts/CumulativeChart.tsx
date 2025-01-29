import React from 'react';
import {Line} from 'react-chartjs-2';
import '@/utils/ChartConfig.tsx';
import {format, parseISO} from 'date-fns';

interface CumulativeChartProps {
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

const CumulativeChart: React.FC<CumulativeChartProps> = ({
                                                             data,
                                                             start_date,
                                                             end_date,
                                                         }) => {
    const formattedLabels = data.map((item) =>
        format(parseISO(item.date), 'dd.MM')
    );

    const chartData = {
        labels: formattedLabels,
        datasets: [
            {
                label: 'Wydatki',
                data: data.map((item) => item.cumulative_expense),
                backgroundColor: 'rgba(188,75, 81, 0.2)',
                borderColor: 'rgba(188,75, 81, 1)',
                fill: true,
                count: data.map((item) => item.cumulative_expense_count),
            },
            {
                label: 'Przychody',
                data: data.map((item) => item.cumulative_income),
                backgroundColor: 'rgba(76,214, 132, 0.2)',
                borderColor: 'rgba(76,214, 132, 1)',
                fill: true,
                count: data.map((item) => item.cumulative_income_count),
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
                text: [
                    `Okres`,
                    `(${format(parseISO(start_date), 'dd.MM.yyyy')} - ${format(
                        parseISO(end_date),
                        'dd.MM.yyyy'
                    )})`,
                ],
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
                        const dataset = tooltipItem.dataset;
                        const label = dataset.label;
                        const value = dataset.data[tooltipItem.dataIndex];
                        const count = dataset.count[tooltipItem.dataIndex];

                        return [
                            `${label}: ${value} zł`,
                            `Liczba transakcji: ${count}`,
                        ];
                    },
                },
            },
            datalabels: {
                display: false,
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

    return <Line data={chartData} options={options}/>;
};

export default CumulativeChart;
