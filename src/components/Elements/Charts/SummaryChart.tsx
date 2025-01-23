import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

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
    const chartData = [
        { name: 'Wydatki', value: expenses, count: expense_count, fill: 'red' },
        { name: 'Przychody', value: incomes, count: income_count, fill: 'green' },
    ];

    return (
        <div
            style={{
                width: '100%',
                height: '400px',
                userSelect: 'none', // Wyłączenie zaznaczania
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Podsumowanie wydatków i przychodów ({start_date} - {end_date})
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#333', // Ciemne tło tooltipa
                            borderRadius: '8px',
                            color: '#fff',
                            border: 'none',
                        }}
                        formatter={(value: number, name: string) =>
                            name === 'value'
                                ? [`${value} zł`, 'Kwota']
                                : [`${value}`, 'Liczba']
                        }
                        labelFormatter={(label: string) => `Kategoria: ${label}`}
                    />
                    <Legend />
                    <Bar
                        dataKey="value"
                        name="Kwota (zł)"
                        radius={[10, 10, 0, 0]}
                        label={{ position: 'top', fill: '#000' }}
                        // Kolory ustawiane z danych
                        isAnimationActive={false} // Wyłączenie animacji (opcjonalnie)
                    >
                        {chartData.map((entry, index) => (
                            <Bar
                                key={`bar-${index}`}
                                dataKey="value"
                                fill={entry.fill}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SummaryChart;
