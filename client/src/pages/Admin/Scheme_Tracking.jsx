import { Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJs, defaults } from 'chart.js/auto';
import Select from 'react-select';
import { states_districts } from '../../data';
import { BASE_URL } from '../../api';
import PieChart from '../../components/Charts/PieChart';
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import BarChart from '../../components/Charts/BarChart';


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function Scheme_Tracking() {
  const [formData, setFormData] = useState({ state: "", district: "" });
  const [schemeProgress, setSchemeProgress] = useState([]);

  const getSchemeProgress = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-single-district-scheme?district=${formData.district}`);
      const data = response.data.data;
      setSchemeProgress(data);
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    getSchemeProgress();
  }, [formData.district]);

  const handleInputChange = (selectedOption, { name }) => {
    formData.district = selectedOption ? selectedOption.value : "";

    setFormData({
      ...formData,
      [name]: formData.district,
    });
  };

  const generateCharts = () => {
    const labels = schemeProgress.map(scheme => scheme.govt_scheme);
    const data = schemeProgress.map(scheme => parseFloat(scheme.percentageProgress));
    const title = "Scheme Progress";

    return <BarChart labels={labels} data={data} title={title} yAxisMax={100}  />;
  };
  return (
    <div className='m-2 px-4 h-screen'>
      <div className='flex justify-between items-center '>
        <Typography variant='h3' >Scheme Progress</Typography>
        <div >
          <Link to={'/admin/single-scheme-details'} className='flex items-center gap-2 hover:underline'>
            <Typography variant='h5'>Scheme-wise Progress</Typography>
            <p><FaExternalLinkAlt /></p>
          </Link>
        </div>
      </div>

      <div className='flex items-center justify-center gap-5 mt-4  w-full flex-col lg:flex-row'>
        <div className="lg:w-1/2 w-full">
          <Typography variant='h5' >State</Typography>
          <Select
            options={states_districts?.map(state =>
              ({ value: state.state, label: state.state }))}
            name="state"
            onChange={(value) => handleInputChange(value, { name: "state" })}
            placeholder="Select State"
            classNamePrefix="select"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <Typography variant='h5'>Districts</Typography>
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
      {formData.district &&
        <>
          <div>
            <Typography color="blue" variant='h3'>Scheme Summary for <span className='text-deep-orange-400'>{formData.district}</span></Typography>
            <div className='w-full' style={{ height: '400px' }}>
              {generateCharts()}
            </div>
          </div>
          {/* <div className='mt-4'>
            <Typography variant='h4' className='mb-4 text-center'><span className='text-deep-orange-400'>{formData.district}</span> District Map</Typography>
            <div className='flex justify-center shadow-md'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Solapur_district_tehsils.svg/1024px-Solapur_district_tehsils.svg.png" alt={'distrcit name'} className='object-cover' />
            </div>
          </div> */}
        </>
      }

    </div>
  )
}
