import React from 'react';
import {Bar} from 'react-chartjs-2';
import {format, parseISO} from 'date-fns';

interface TransactionsOverTimeChartProps {
    data: {
        time_group: string;
        expenses: number;
        incomes: number;
    }[];
    interval: string;
}

const SummaryByTimeChart: React.FC<TransactionsOverTimeChartProps> = ({data, interval}) => {
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
                backgroundColor: '#BC4B51',
                borderRadius: 8,
            },
            {
                label: 'Przychody',
                data: data.map((item) => item.incomes),
                backgroundColor: '#4cd684',
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
                    size: 12,
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

    return (
        <Bar
            data={chartData}
            options={options}
        />
    );
};

export default SummaryByTimeChart;
