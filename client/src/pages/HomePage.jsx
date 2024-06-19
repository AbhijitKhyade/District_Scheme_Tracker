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
          <Typography variant='h3' className='text-center font-bold text-4xl mt-4 animate-bounce shadow-deep-orange-500'
            style={{
              backgroundImage: 'linear-gradient(45deg, #FFB800, #FF6347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              zIndex: -1
            }}>Welcome to District Schemes </Typography>
          <div className='mt-4'>
            <img src={map} alt="India" />
          </div>
          {/* <div className='mt-4'>
            <a href="https://www.india.gov.in/">Government Website</a>
          </div> */}
        </div>
      </div>
    </div>
  )
}
