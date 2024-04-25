import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJs, defaults } from 'chart.js/auto';
import PieChart from '../Charts/PieChart';
import { BASE_URL } from '../../api';
import { states_districts } from '../../data';
import Select from 'react-select';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function AdminDashboard() {
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

    return <PieChart labels={labels} data={data} title={title} />;
  };
  return (
    <div className='m-2 px-4'>
      <Typography variant='h3' className='mb-4 text-center'>Scheme Dashboard</Typography>
      <div className='flex items-center justify-center gap-5  w-full sm:flex-col lg:flex-row'>
        <div className="w-1/2 sm:w-full">
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
        <div className="w-1/2 sm:w-full">
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
          <div className='mt-4'>
            <Typography variant='h4' className='mb-4 text-center'><span className='text-deep-orange-400'>{formData.district}</span> District Map</Typography>
            <div className='flex justify-center shadow-md'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Solapur_district_tehsils.svg/1024px-Solapur_district_tehsils.svg.png" alt={'distrcit name'} className='object-cover' />
            </div>
          </div>
        </>
      }

    </div>
  )
}
