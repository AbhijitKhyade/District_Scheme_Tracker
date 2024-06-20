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
        return formData.parameters.map((parameter, index) => {
            // console.log(parameter.name)
            let name = findFirstWord(parameter.name);
            // console.log(name)
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

        // Check if the first word includes keywords that suggest a bar chart
        // Get the first word and convert to lowercase
        // console.log(firstWord)
        if (firstWord === "Number" || firstWord === "Quantity" || firstWord === "Amount") {
            return "bar"; // Use a bar chart for numerical data
        } else {
            return "pie"; // Use a pie chart for other types of arrays
        }

    };





    const generateChartData = (parameter) => {
        const labels = parameter.value.map((_, index) => `Month ${index + 1}`);
        const data = parameter.value.map(value => Number(value));
        // console.log(data);
        return { labels, data };
    };

    const renderChart = (type, labels, data, title) => {
        switch (type) {
            case "bar":
                return <BarChart labels={labels} data={data} title={title} max={Math.max(...data)} />;
            case "line":
                return <LineChart labels={labels} data={data} title={title} max={Math.max(...data)} />;
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
