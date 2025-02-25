import { Input, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { BASE_URL } from '../../api';
import ButtonComp from '../../components/Button';
import { getDistrict } from '../../components/OfficersModule/OfficersDashboard';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';

export default function Scheme_Monitoring() {
  const currentUser = useSelector((state) => state.user.currentUser);
  let district = getDistrict();
  // console.log('district:', district)
  const [formData, setFormData] = useState({
    govt_scheme: '',
    district: '',
    parameters: [],
    state: "Maharashtra",
  });
  const navigate = useNavigate();

  const [selectedScheme, setSelectedScheme] = useState('');
  const [schemeParameters, setSchemeParameters] = useState([]);
  const [schemeNames, setSchemeNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (value, { name }) => {
    setSelectedScheme(value.value);
    getSchemeParameters(value.value);
  }

  const getSchemes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/all-govt-schemes`);
      const schemes = response.data.data.map(scheme => ({
        value: scheme.govt_scheme,
        label: scheme.govt_scheme
      }));
      setSchemeNames(schemes);
    } catch (error) {
      console.log('error:', error);
    }
  }

  const getSchemeParameters = async (schemeName) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-single-scheme?name=${schemeName}`);
      const parameters = response.data.data.split(/[\.\n]+/);
      // console.log(parameters)
      setSchemeParameters(parameters.map(parameter => ({ name: parameter.trim(), value: '' })));
    } catch (error) {
      console.log('error:', error);
    }
  }
  const handleChangeParameter = (index, value) => {
    let newSchemeParameters = [...schemeParameters];
    newSchemeParameters[index].value = value;
    setSchemeParameters(newSchemeParameters);
  }

  const handleSubmit = async () => {
    const updatedFormData = {
      ...formData,
      govt_scheme: selectedScheme,
      parameters: schemeParameters
    };
    setFormData(updatedFormData);

    console.log('formData:', updatedFormData);
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/admin/add-scheme-monitoring`, updatedFormData);
      // console.log('Response:', response.data);
      setFormData({
        govt_scheme: '',
        district: '',
        parameters: []
      });
      toast.success("Monitoring Record Added Successfully", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      navigate('/officers/dashboard');
    } catch (error) {
      setLoading(false);
      console.log('Error:', error);
      toast.error(error?.response?.data?.message, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  const getOfficerDistrict = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-officer-district?email=${currentUser.email}`);
      // console.log('response:', response.data.data.districtName);
      setFormData({
        ...formData,
        district: response.data.data.districtName
      })

    } catch (error) {
      console.log('error:', error);
    }
  };


  useEffect(() => {
    getOfficerDistrict();
    getSchemes();
  }, []);

  const isDisabled = selectedScheme === '' || schemeParameters.some(parameter => parameter.value === '');

  return (
    <div className='m-2 px-4 h-screen'>
      <Typography variant='h3' size='xl' className='text-center'>Scheme Monitoring</Typography>
      <div className="flex flex-col items-center ">
        <div className="lg:w-3/4 w-full mt-4 mb-4">
          <Select
            options={schemeNames}
            name="govt_scheme"
            onChange={(value) => handleInputChange(value, { name: "govt_scheme" })}
            placeholder="Select Scheme"
            classNamePrefix="select"
          />
        </div>
        <div className="mt-4 mb-4 w-full">
          <Typography variant='h5' className='mb-4' >{selectedScheme}</Typography>
          <div className='flex flex-wrap'>
            {schemeParameters.map((parameter, index) => (
              <div key={index} className="lg:w-1/2 px-3 mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">{parameter.name}</label>
                <Input
                  type="text"
                  className="w-full border border-gray-500 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder={parameter.name}
                  value={parameter.value}
                  onChange={(e) => handleChangeParameter(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className='px-3 float-right'>
            <ButtonComp name={'Add Monitoring Record'} disabled={isDisabled} fullWidth onClick={handleSubmit} loading={loading} />
          </div>
        </div>

      </div >
    </div >
  )
}
