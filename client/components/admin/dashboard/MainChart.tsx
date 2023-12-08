"use client"
import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { costStatistics } from '@/services/admin/adminDashboardService';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Biểu đồ Vốn - Doanh Thu theo tháng (đơn vị Việt Nam Đồng)',
        },
    },
};

export function MainChart() {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [cost, setCost] = useState(Array(labels.length).fill(0));
    const [revenue, setRevenue] = useState(Array(labels.length).fill(0));
    const data = {
        labels,
        datasets: [
            {
                label: 'Vốn Nhập Hàng',
                data: cost,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Doanh Thu',
                data: revenue,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const handleCostStatistics = async () => {
        try {
            const data = await costStatistics();
            if(data.EC == 0) {
                const temp = Array(labels.length).fill(0);
                for(let i = 0; i < data.DT.cost.length; i++) {
                    temp[data.DT.cost[i].month - 1] = Number(data.DT.cost[i].cost);
                }
                setCost(temp);

                const temp2 = Array(labels.length).fill(0);
                for(let i = 0; i < data.DT.revenue.length; i++) {
                    temp2[data.DT.revenue[i].month - 1] = Number(data.DT.revenue[i].revenue);
                }
                setRevenue(temp2);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleCostStatistics();
    }, [])

    return <Bar options={options} data={data} />;
}