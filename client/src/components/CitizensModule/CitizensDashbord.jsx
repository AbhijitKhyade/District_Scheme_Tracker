import React from 'react';
import { Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { districtMaps, states_districts } from '../../data';

export default function CitizensDashboard() {
  const currentUser = useSelector(state => state.user.currentUser);
  const mapUrl = districtMaps[currentUser?.district];

  // Function to find the state of the district
  const findState = (district) => {
    for (let state of states_districts) {
      if (state.districts.includes(district)) {
        return state.state;
      }
    }
    return "Unknown"; // If district not found, handle appropriately
  };

  const stateOfDistrict = findState(currentUser?.district);

  return (
    <div className='m-2 px-4'>
      <Typography variant='h3' className='mb-4 text-center'>Welcome to <span className='text-red-400'>{stateOfDistrict}</span> State </Typography>
      <Typography variant='h4' className='mb-4 text-center'>Welcome to <span className='text-deep-orange-400'>{currentUser?.district}</span> District</Typography>
      <div className='flex justify-center shadow-md'>
        <img src={mapUrl} alt={currentUser?.district} className='object-cover' />
      </div>
    </div>
  );
}
