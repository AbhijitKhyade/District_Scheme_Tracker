import React from 'react'
import { Bar } from 'react-chartjs-2';

export default function BarChart({ labels, data, title }) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        indexAxis: 'x', // Change indexAxis to 'x' for vertical bars
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            y: {
                suggestedMin: 0, // Minimum value for the y-axis
                suggestedMax: Math.max(...data) + 500, // Maximum value for the y-axis
            },
        },
        maintainAspectRatio: false,
        height: 800,
    };

    return (
        <Bar data={chartData} options={options} />
    )
}
