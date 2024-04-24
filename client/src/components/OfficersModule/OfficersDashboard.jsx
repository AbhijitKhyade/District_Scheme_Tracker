import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api';
import { Typography } from '@material-tailwind/react';

export default function OfficersDashboard() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const getOfficerDistrict = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-single-officer?email=${currentUser.email}`);
      // console.log('response:', response.data.data);
      setDistrict(response.data.data.states[0].districts[0].districtName);
      setMapUrl(response.data.data.states[0].districts[0].mapUrl);
      setState(response.data.data.states[0].stateName);
    } catch (error) {
      console.log('error:', error);
    }
  }

  useEffect(() => {
    getOfficerDistrict();
  }, []);

  return (
    <div className='m-2 px-4'>
      <Typography variant='h3' className='mb-4 text-center'>Welcome to <span className='text-red-400'>{state}</span> State </Typography>
      <Typography variant='h4' className='mb-4 text-center'>You are assigned to <span className='text-deep-orange-400'>{district}</span> District</Typography>
      <div className='flex justify-center shadow-md'>
        <img src={mapUrl} alt={district} className='object-cover' />
      </div>
    </div>
  )
}
