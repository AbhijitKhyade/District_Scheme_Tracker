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

    const findFirstWord = (name) => {
        // Trim any leading or trailing whitespace
        const trimmedName = name.trim();

        // Find the index of the first space
        const spaceIndex = trimmedName.indexOf(' ');

        if (spaceIndex !== -1) {
            // If there is a space, return the substring from the start to the first space
            return trimmedName.substring(0, spaceIndex);
        } else {
            // If there is no space, return the entire string
            return trimmedName;
        }
    };
    const generateCharts = () => {
        return schemeProgress.parameters.map((parameter, index) => {
            const name = findFirstWord(parameter.name);
            const chartType = determineChartType(name);
            const { labels, data } = generateChartData(parameter);
            return (
                <div key={index} className='w-full mt-5' style={{ height: '400px' }}>
                    {renderChart(chartType, labels, data, parameter.name)}
                </div>
            );
        });
    };

    const determineChartType = (firstWord) => {

        if (firstWord === "Number" || firstWord === "Quantity" || firstWord === "Amount") {
            return "bar"; // Use a bar chart for numerical data
        } else {
            return "pie"; // Use a pie chart for other types of arrays
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
            <Typography variant='h3' size='xl'>Scheme Progress </Typography>
            <p className='mt-3 flex justify-between'>
                <div className='text-xl text-blue-gray-800 font-semibold  border-gray-700'>{name}</div>
                <div className='flex gap-4'>
                    <div className='flex gap-3'>
                        <Link to={`/citizens/scheme?action=feedback&name=${name}`} className='flex flex-col'>
                            <p className='text-red-400'>*Give Feedback here</p>
                            <div className='flex items-center gap-1'>
                                <Typography color='blue-gray' variant='h6' size='sm'>Feedback</Typography>
                                <RiFeedbackFill />
                            </div>
                        </Link>
                    </div>
                </div>
            </p>
            <hr className='mt-4 ' />
            {generateCharts()}
        </div>
    );
}
