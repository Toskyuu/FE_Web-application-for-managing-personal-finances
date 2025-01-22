import React from 'react';
import {Pie} from 'react-chartjs-2';
import {format, parseISO} from 'date-fns';

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

const SummaryByCategoryChart: React.FC<SummaryByCategoryChartProps> = ({data, start_date, end_date, type}) => {
    const mappedData = data.map((item) => ({
        category: item.category,
        value: type == 'Income' ? item.incomes : item.expenses,
        count: type == 'Income' ? item.income_count : item.expense_count,
    }));

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
                borderColor: colors.map((color) => color.replace('0.8', '1')),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Podsumowanie ${type == 'Income' ? 'przychodów' : 'wydatków'} w okresie ${format(parseISO(start_date), 'dd.MM.yyyy')} - ${format(parseISO(end_date), 'dd.MM.yyyy')}`,
                font: {
                    size: 24
                }
            },
            legend: {
                labels: {
                    font: {
                        size: 24
                    }
                }
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
                            `${type == 'Income' ? 'Przychody' : 'Wydatki'}: ${value} zł`,
                            `Liczba transakcji: ${count}`,
                        ];
                    },
                },
            },
        },
        elements: {
            arc: {
                borderWidth: 3,
            },
        },
        cutout: '60%',
    };

    return <Pie data={chartData} options={options}/>;
};

export default SummaryByCategoryChart;
