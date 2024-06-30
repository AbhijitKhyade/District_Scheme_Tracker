import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api';
import { Typography } from '@material-tailwind/react';
import { districtMaps } from '../../data';

let districtValue = '';

export const setDistrict = (value) => {
  districtValue = value;
};

export const getDistrict = () => {
  return districtValue;
};

export default function OfficersDashboard() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const getOfficerDistrict = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-single-officer?email=${currentUser.email}`);
      // console.log('response:', response.data.data);
      const officerData = response.data.data[0];
      setDistrict(officerData.district);
      setMapUrl(districtMaps[officerData.district]); // Set mapUrl based on district name
      setState(officerData.state);
    } catch (error) {
      console.log('error:', error);
    }
  }

  useEffect(() => {
    getOfficerDistrict();
  }, []);
  districtValue = district;
  return (
    <div className='m-2 px-4 h-screen'>
      <Typography variant='h3' className='mb-4 text-center'>Welcome to <span className='text-red-400'>{state}</span> State </Typography>
      <Typography variant='h4' className='mb-4 text-center'>You are assigned to <span className='text-deep-orange-400'>{district}</span> District</Typography>
      <div className='flex justify-center shadow-md'>
        <img src={mapUrl} alt={district} className='object-cover' />
      </div>

    </div>
  )
}
