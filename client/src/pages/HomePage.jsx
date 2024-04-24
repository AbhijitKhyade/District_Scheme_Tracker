import React from 'react'
import NavbarList from '../components/NavbarList'
import { Typography } from '@material-tailwind/react'
import map from '../assets/indiaMap.jpg'

export default function HomePage() {
  return (
    <div className='overflow-hidden'>
      <NavbarList />
      <div className="w-full h-full m-2 px-4">
        <div className="flex flex-col items-center h-full">
          <Typography variant='h3' size='xl' className='text-center mt-4'>Welcome to District Schemes </Typography>
          <div className='mt-4'>
            <img src={map} alt="India" />
          </div>
        </div>
      </div>
    </div>
  )
}
