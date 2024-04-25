import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJs, defaults } from 'chart.js/auto';
import { BASE_URL } from '../../api';
import PieChart from '../../components/Charts/PieChart';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
export default function SchemeSummary() {
  const currentUser = useSelector(state => state.user.currentUser);
  const district = currentUser?.district;

  const [schemeProgress, setSchemeProgress] = useState([]);

  const getSchemeProgress = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-single-district-scheme?district=${district}`);
      const data = response.data.data;
      setSchemeProgress(data);
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    getSchemeProgress();
  }, []);

  const generateCharts = () => {
    const labels = schemeProgress.map(scheme => scheme.govt_scheme);
    const data = schemeProgress.map(scheme => parseFloat(scheme.percentageProgress));
    const title = "Scheme Progress";

    return <PieChart labels={labels} data={data} title={title} />;
  };

  return (
    <div className='m-2 px-4'>
      <Typography color="blue" variant='h3'>Scheme Summary for <span className='text-deep-orange-400'>{district}</span></Typography>
      <div className='w-full' style={{ height: '400px' }}>
        {generateCharts()}
      </div>
    </div>
  );
}
