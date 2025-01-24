import React from 'react';
import { Bar } from 'react-chartjs-2';
import '@/utils/ChartConfig.tsx';
import { format, parseISO } from 'date-fns';

interface TransactionsOverTimeChartProps {
    data: {
        time_group: string;
        expenses: number;
        incomes: number;
    }[];
    interval: string;
}

const SummaryByTimeChart: React.FC<TransactionsOverTimeChartProps> = ({ data, interval }) => {
    const formattedLabels = data.map((item) => {
        const date = parseISO(item.time_group);
        if (interval === 'Monthly') {
            return format(date, 'MM.yy');
        } else if (interval === 'Yearly') {
            return format(date, 'yy');
        }
        return format(date, 'dd.MM');
    });

    const chartData = {
        labels: formattedLabels,
        datasets: [
            {
                label: 'Wydatki',
                data: data.map((item) => item.expenses),
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderRadius: 8,
            },
            {
                label: 'Przychody',
                data: data.map((item) => item.incomes),
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const dataset = tooltipItem.dataset;
                        const label = dataset.label;
                        const value = dataset.data[tooltipItem.dataIndex];
                        return `${label}: ${value} zł`;
                    },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    drawOnChartArea: false,
                    drawBorder: true,
                },
            },
            y: {
                stacked: true,
                grid: {
                    drawOnChartArea: false,
                    drawBorder: true,
                },
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default SummaryByTimeChart;
