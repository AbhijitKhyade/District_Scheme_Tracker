import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../../api';
import { Typography } from '@material-tailwind/react';

export default function SchemeProgress() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const district = 'Pune';

    const [schemeProgress, setSchemeProgress] = useState([]);

    const getSchemeProgress = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/get-single-scheme-monitoring?name=${name}&district=${district}`);
            console.log('response:', response.data.data);
            // setSchemeProgress(response.data.data);
        } catch (error) {
            console.log('error:', error);
        }
    };

    useEffect(() => {
        getSchemeProgress();
    }, []);


    return (
        <div className='m-2 px-4'>
            <Typography variant='h3' size='xl'>Scheme Progress</Typography>
            <p className='mt-3'> <span className='text-xl text-blue-gray-800 font-semibold
             border-b-2 border-gray-700'>{name}</span></p>
            {/* Your component content here */}
        </div>
    );
}
