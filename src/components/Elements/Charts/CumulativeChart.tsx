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
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true,
                count: data.map((item) => item.cumulative_expense_count),
            },
            {
                label: 'Przychody',
                data: data.map((item) => item.cumulative_income),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: true,
                count: data.map((item) => item.cumulative_income_count),
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
                text: [
                    `Okres`,
                    `(${format(parseISO(start_date), 'dd.MM.yyyy')} - ${format(
                        parseISO(end_date),
                        'dd.MM.yyyy'
                    )})`,
                ],
            },
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const dataset = tooltipItem.dataset;
                        const label = dataset.label; // "Wydatki" lub "Przychody"
                        const value = dataset.data[tooltipItem.dataIndex]; // Kwota
                        const count = dataset.count[tooltipItem.dataIndex]; // Liczba transakcji

                        return [
                            `${label}: ${value} zł`,
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

    return <Line data={chartData} options={options}/>;
};

export default CumulativeChart;
