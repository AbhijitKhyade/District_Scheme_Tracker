import { Card, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../api';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Govt_Schemes() {
  const [schemes, setSchemes] = useState([]);

  const getSchemes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/all-govt-schemes`);
      setSchemes(response.data.data);
    } catch (error) {
      console.log('error:', error);
    }
  }

  useEffect(() => {
    getSchemes();
  }, []);

  return (
    <div className='m-2 px-4'>
      <Typography variant='h3' size='xl' className='text-lg sm:text-xl md:text-2xl lg:text-3xl'>Government Schemes</Typography>
      <div className='grid grid-cols-1 gap-4 mt-4'>
        {schemes?.map((scheme, index) => (
          <Link to={`/citizens/scheme-progress?name=${scheme.govt_scheme}`} key={index}>
            <Card className='border border-gray-300 w-full rounded-sm hover:drop-shadow-2xl'>
              <div className='overflow-x-auto'>
                <div className='flex items-center justify-between border-gray-200 px-4 py-2'>
                  <div className='flex flex-col justify-start'>
                    <div className='flex items-center gap-2'>
                      <Typography variant='h5' size='md' className='text-base sm:text-lg md:text-xl text-black'>Scheme Name:</Typography>
                      <span className='text-md sm:text-base md:text-lg lg:text-xl  text-blue-400 font-semibold'>{scheme.govt_scheme}</span>
                      <div>
                        <FaExternalLinkAlt />
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Typography variant='h5' size='md' className='text-base sm:text-lg md:text-xl  text-black'>Scheme Objective:</Typography>
                      <ul className='list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600'>
                        {scheme.objective.split(/[\.\n]+/).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Typography variant='h5' size='md' className='text-base sm:text-lg md:text-xl text-black'>Scheme Description:</Typography>
                      <span className='text-xs sm:text-sm md:text-base text-gray-600'>{scheme.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
