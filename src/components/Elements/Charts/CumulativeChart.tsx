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
    const formattedLabels = data.map((item) => format(parseISO(item.date), 'dd.MM.yyyy'));

    const chartData = {
        labels: formattedLabels,
        datasets: [
            {
                label: 'Wydatki',
                data: data.map((item) => item.cumulative_expense),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true,
            },
            {
                label: 'Przychody',
                data: data.map((item) => item.cumulative_income),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Wydatki i przychody na przestrzeni czasu (${format(parseISO(start_date), 'dd.MM.yyyy')} - ${format(parseISO(end_date), 'dd.MM.yyyy')})`,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const dataset = tooltipItem.dataset;
                        const dataIndex = tooltipItem.dataIndex;

                        // Find corresponding data point
                        const currentData = data[dataIndex];
                        let label = dataset.label;

                        if (label === 'Wydatki') {
                            return `${label}: ${currentData.cumulative_expense} zł (${currentData.cumulative_expense_count} transakcji)`;
                        }

                        if (label === 'Przychody') {
                            return `${label}: ${currentData.cumulative_income} zł (${currentData.cumulative_income_count} transakcji)`;
                        }

                        return label;
                    },
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Kwota (zł)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <Line data={chartData} options={options}/>
    );
};

export default CumulativeChart;
