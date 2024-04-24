import { Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { BASE_URL } from '../../api';
export default function Scheme_Monitoring() {

  const [formData, setFormData] = useState({
    govt_scheme: '',

  });

  const [schemeNames, setSchemeNames] = useState([]);

  const handleInputChange = (value, { name }) => {
    setFormData({ ...formData, [name]: value.value });
  }

  const getSchemes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/all-govt-schemes`);
      // console.log('response:', response.data.data);
      const schemes = [];
      response.data.data.map(scheme => {
        schemes.push({ value: scheme.govt_scheme, label: scheme.govt_scheme });
      });
      // console.log(schemes)
      setSchemeNames(schemes);
    } catch (error) {
      console.log('error:', error);
    }
  }

  useEffect(() => {
    getSchemes();
  }, []);

  return (
    <div className='m-2 px-4'>
      <Typography variant='h3' size='xl' className='text-center'>Scheme Monitoring</Typography>
      <Typography variant='h5' >Schemes</Typography>
      <div className="flex flex-col items-center ">
        <div className="lg:w-3/4 md:w-full mt-4 mb-4 sm:w-full">
          <Select
            options={schemeNames}
            name="govt_scheme"
            onChange={(value) => handleInputChange(value, { name: "govt_scheme" })}
            placeholder="Select Scheme"
            classNamePrefix="select"
          />
        </div>
      </div>
    </div>
  )
}
