import { Typography } from '@material-tailwind/react'
import React from 'react'

export default function CitizensDashbord() {
  return (
    <div className='m-2 px-4'>
      <Typography variant='h3' className='mb-4 text-center'>Welcome to <span className='text-red-400'>state</span> State </Typography>
      <Typography variant='h4' className='mb-4 text-center'>Welcome to <span className='text-deep-orange-400'>district</span> District</Typography>
      <div className='flex justify-center shadow-md'>
        {/* <img src={mapUrl} alt={district} className='object-cover' /> */}
      </div>

    </div>
  )
}
