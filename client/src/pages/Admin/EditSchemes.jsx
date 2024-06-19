import React, { useEffect, useState } from 'react';
import { Input, Textarea, Typography } from "@material-tailwind/react";
import ButtonComp from '../../components/Button';
import axios from 'axios';
import { BASE_URL } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditSchemes() {
    const [formData, setFormData] = useState({
        scheme: "",
        objective: "",
        description: "",
        parameters: "",
    });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEdit = async () => {
        // console.log(formData);
        if (!formData.scheme || !formData.objective || !formData.description || !formData.parameters) {
            alert('Please fill all the fields');
        }
        try {
            const response = await axios.put(`${BASE_URL}/admin/edit-govt-scheme?name=${name}`, formData);
            // console.log('response : ', response?.data?.data);
            toast.success('Scheme Updated Successfully', {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            navigate('/admin/govt-schemes');
        } catch (error) {
            console.log('Error:', error);
        }
    };



    const allGovtSchemes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/get-single-scheme-details?name=${name}`);
            // console.log('response : ', response?.data?.data);
            setFormData({
                scheme: response?.data?.data?.govt_scheme,
                objective: response?.data?.data?.objective,
                description: response?.data?.data?.description,
                parameters: response?.data?.data?.parameters
            });
        } catch (error) {
            console.log('Error:', error);
        }
    }

    useEffect(() => {
        allGovtSchemes();
    }, []);



    return (
        <div className='m-2 px-4'>
            <div className='w-full text-center mb-4 mt-4'>
                <Typography color="blueGray" className='text-2xl font-bold'>Edit Government Scheme</Typography>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='w-full sm:w-1/2'>
                    <Input
                        type="text"
                        placeholder="Enter Government Scheme"
                        name="scheme"
                        label='Government Scheme'
                        value={formData.scheme}
                        onChange={handleInputChange}
                        outline={false}
                        size="lg"
                        fullWidth
                    />
                </div>
                <div className='mt-4 w-full sm:w-1/2'>
                    <Textarea
                        type="text"
                        placeholder="Objective"
                        name="objective"
                        label='Objective'
                        value={formData.objective}
                        onChange={handleInputChange}
                        outline={false}
                        size="lg"
                        fullWidth
                    />
                </div>
                <div className='mt-4 w-full sm:w-1/2'>
                    <Textarea
                        placeholder="Description"
                        name="description"
                        label='Description'
                        value={formData.description}
                        onChange={handleInputChange}
                        outline={false}
                        size="regular"
                        fullWidth
                    />
                </div>
                <div className='mt-4 w-full sm:w-1/2'>
                    <Textarea
                        placeholder="Parameters"
                        name="parameters"
                        label='Parameters'
                        value={formData.parameters}
                        onChange={handleInputChange}
                        outline={false}
                        size="regular"
                        fullWidth
                    />
                </div>
                <div className='mt-4 w-full flex justify-end sm:w-1/2'>
                    <ButtonComp
                        name={"Update Scheme"}
                        onClick={handleEdit}
                        type={'submit'}
                        className={'font-bold py-3 px-4 rounded-md mt-2 cursor-pointer'}
                        fullWidth
                    />
                </div>
            </div>
        </div>
    );
}
