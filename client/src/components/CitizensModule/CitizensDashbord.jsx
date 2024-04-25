import { Typography, useSelect } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { districtMaps } from '../../data';

export default function CitizensDashbord() {
  const currentUser = useSelector(state => state.user.currentUser);
  const mapUrl = districtMaps[currentUser?.district];

  return (
    <div className='m-2 px-4'>
      <Typography variant='h3' className='mb-4 text-center'>Welcome to <span className='text-red-400'>state</span> State </Typography>
      <Typography variant='h4' className='mb-4 text-center'>Welcome to <span className='text-deep-orange-400'>{currentUser?.district}</span> District</Typography>
      <div className='flex justify-center shadow-md'>
        <img src={mapUrl} alt={currentUser?.district} className='object-cover' />
      </div>

    </div>
  )
}
