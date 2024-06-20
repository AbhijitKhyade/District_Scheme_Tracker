import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../api';
import { Typography } from '@material-tailwind/react';
import BarChart from '../../components/Charts/BarChart';
import { Chart as ChartJs, defaults } from 'chart.js/auto';
import PieChart from '../../components/Charts/PieChart';
import LineChart from '../../components/Charts/LineChart';
import { useSelector } from 'react-redux';
import { RiFeedbackFill } from "react-icons/ri";
import { MdReport } from "react-icons/md";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function SchemeProgress() {
    const currentUser = useSelector(state => state.user.currentUser);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const district = currentUser?.district;

    const [schemeProgress, setSchemeProgress] = useState({
        govt_scheme: "",
        parameters: []
    });

    const getSchemeProgress = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/get-single-scheme-monitoring?name=${name}&district=${district}`);
            // console.log('response:', response.data.data);
            const data = response.data.data;
            setSchemeProgress({
                govt_scheme: data.govt_scheme,
                parameters: data.parameters,
            });
        } catch (error) {
            console.log('error:', error);
        }
    };

    useEffect(() => {
        getSchemeProgress();
    }, []);

    const generateCharts = () => {
        return schemeProgress.parameters.map((parameter, index) => {
            const chartType = determineChartType(parameter.value);
            const { labels, data } = generateChartData(parameter);
            return (
                <div key={index} className='w-full mt-5' style={{ height: '400px' }}>
                    {renderChart(chartType, labels, data, parameter.name)}
                </div>
            );
        });
    };

    const determineChartType = (value) => {
        if (Array.isArray(value)) {
            const isNumericArray = value.every((val) => !isNaN(val));
            // console.log('isNumericArray:', isNumericArray)
            if (isNumericArray) {
                return "bar"; // For numerical arrays, use a line chart
            } else {
                return "pie"; // For other arrays, use a pie chart
            }
        } else {
            return "bar"; // For single numerical value, use a bar chart
        }
    };




    const generateChartData = (parameter) => {
        const labels = parameter.value.map((_, index) => `Month ${index + 1}`);
        const data = parameter.value.map(value => Number(value));
        return { labels, data };
    };

    const renderChart = (type, labels, data, title) => {
        switch (type) {
            case "bar":
                return <BarChart labels={labels} data={data} title={title} />;
            case "line":
                return <LineChart labels={labels} data={data} title={title} />;
            case "pie":
                return <PieChart labels={labels} data={data} title={title} />;
            default:
                return null;
        }
    };

    return (
        <div className='m-2 px-4 h-auto overflow-auto'>
            <Typography variant='h3' size='xl'>Scheme Progress</Typography>
            <p className='mt-3 flex justify-between'>
                <div className='text-xl text-blue-gray-800 font-semibold  border-gray-700'>{name}</div>
                <div className='flex gap-4'>
                    <div className='flex gap-3'>
                        <Link to={`/citizens/scheme?action=feedback&name=${name}`} className='flex items-center gap-1'>
                            <Typography color='blue-gray' variant='h6' size='sm'>Feedback</Typography>
                            <RiFeedbackFill />
                        </Link>
                    </div>
                </div>
            </p>
            <hr className='mt-4 ' />
            {generateCharts()}
        </div>
    );
}
