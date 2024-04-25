import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart({ labels, data, title }) {


    const chartData = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: data,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return (
        <Line data={chartData} options={options} />
    );
}
