import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { states_districts } from '../../data';
import { Typography } from '@material-tailwind/react';
import { Chart as ChartJs, defaults } from 'chart.js/auto';
import { BASE_URL } from '../../api';
import axios from 'axios';
import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';
import PieChart from '../../components/Charts/PieChart';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function SingleSchemeDetails() {
    const [formData, setFormData] = useState({ state: "", district: "", govt_scheme: "", parameters: [] });
    const [govtSchemes, setGovtSchemes] = useState([]);
    const handleInputChange = (selectedOption, { name }) => {
        const selectedValue = selectedOption ? selectedOption.value : "";

        setFormData({
            ...formData,
            [name]: selectedValue,
        });
    }

    const getGovtSchemes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/all-govt-schemes`);
            const data = response.data.data;
            const schemes = data.map(scheme => ({ value: scheme.govt_scheme, label: scheme.govt_scheme }));
            // console.log(schemes)
            setGovtSchemes(schemes);
        } catch (error) {
            console.log('error:', error);
        }
    }


    const getSchemeProgress = async () => {
        try {
            // console.log(formData);
            // Ensure formData.district is defined before making the API call
            if (formData.district && formData.govt_scheme) {
                const response = await axios.get(`${BASE_URL}/admin/get-single-scheme-monitoring?name=${formData.govt_scheme}&district=${formData.district}`);
                // console.log('response:', response.data.data);
                const data = response.data.data;
                setFormData({
                    ...formData, // Preserve other form data
                    govt_scheme: data.govt_scheme,
                    parameters: data.parameters,
                });
            }
        } catch (error) {
            console.log('error:', error);
        }
    };


    useEffect(() => {
        getGovtSchemes();
        getSchemeProgress();
    }, [formData.govt_scheme, formData.district]);

    const generateCharts = () => {
        return formData.parameters.map((parameter, index) => {
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
        <div className='m-2 px-4 h-screen'>
            <Typography variant='h3' >Scheme Progress </Typography>

            <div className='flex flex-col sm:flex-row gap-3 mt-4 '>
                <div className='lg:w-1/2 sm:w-full'>
                    <Select
                        options={states_districts?.map(state =>
                            ({ value: state.state, label: state.state }))}
                        name="state"
                        onChange={(value) => handleInputChange(value, { name: "state" })}
                        placeholder="Select State"
                        classNamePrefix="select"
                    />
                </div>
                <div className='lg:w-1/2 sm:w-full'>
                    <Select
                        options={states_districts?.find(state => state.state === formData.state)?.districts?.map(district =>
                            ({ value: district, label: district }))}
                        name='district'
                        placeholder="Select District"
                        classNamePrefix="select"
                        onChange={(value) => handleInputChange(value, { name: "district" })}
                    />
                </div>
            </div>
            <div className='mt-4'>
                <Select
                    options={govtSchemes}
                    name='govt_scheme'
                    placeholder="Select Scheme"
                    classNamePrefix="select"
                    onChange={(value) => handleInputChange(value, { name: "govt_scheme" })}
                />
            </div>
            <p className='mt-3'>
                <span className='text-xl text-blue-gray-800 font-semibold border-b-2 border-gray-700'>{name}</span>
            </p>
            <hr className='mt-4 ' />
            {generateCharts()}
        </div >
    )
}
