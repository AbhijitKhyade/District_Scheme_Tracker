import React, { useEffect, useState } from 'react';
import { Input, Textarea, Typography } from "@material-tailwind/react";
import ButtonComp from '../../components/Button';
import { MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';
import { BASE_URL } from '../../api';
import ModalComp from '../../components/ModalComp';

export default function GovtSchemes() {
  const [formData, setFormData] = useState({
    scheme: "",
    objective: "",
    description: "",
    parameters: "",
  });
  const [showSchemes, setShowSchemes] = useState(false);
  const [schemeId, setSchemeId] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schemes, setSchemes] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (!formData.scheme || !formData.objective || !formData.description || !formData.parameters) {
      alert('Please fill all the fields');
    }
    try {
      const response = await axios.post(`${BASE_URL}/admin/govt-schemes`, formData);
      console.log('response : ', response?.data?.data);
      setFormData({
        scheme: "",
        objective: "",
        description: "",
        parameters: ""
      })
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSchemeChange = () => {
    setShowSchemes(!showSchemes);
  }

  const allGovtSchemes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/all-govt-schemes`);
      // console.log('response : ', response?.data?.data);
      setSchemes(response?.data?.data);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    allGovtSchemes();
  }, []);

  const handleDeleteScheme = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/admin/delete-govt-scheme?id=${scheme_id}`);
      console.log(response.data.data);
      allGovtSchemes();
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  return (
    <div className='m-2 px-4'>
      <div className='w-full text-center mb-4 mt-4'>
        <Typography color="blueGray" className='text-2xl font-bold'>Add Government Scheme</Typography>
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
        <div className='mt-4 w-full flex flex-col sm:flex-row justify-between sm:w-1/2'>
          <ButtonComp
            name={"Add Scheme"}
            onClick={handleSubmit}
            type={'submit'}
            className={'font-bold py-3 px-4 rounded-md mt-2 cursor-pointer'}
            fullWidth
          />
          <ButtonComp
            name={"Show Schemes"}
            type={'button'}
            onClick={handleSchemeChange}
            className={'font-bold py-3 px-4 rounded-md mt-2 cursor-pointer sm:ml-2'}
            fullWidth
          />
        </div>
      </div>

      {showSchemes && (
        <div className='mt-8 w-full sm:w-1/2 mx-auto'>
          <Typography color="blueGray" className='text-2xl font-bold'>Government Schemes</Typography>
          <ul className="list-disc mt-4">
            {schemes.map((scheme) => (
              <li key={scheme._id} className="text-lg flex items-center justify-between">
                <span>{scheme.govt_scheme}</span>
                <div className="flex items-center space-x-2">
                  <MdEdit className="text-blue-600 hover:text-blue-900 w-5 h-5 cursor-pointer" />
                  <MdDelete className="text-red-600 hover:text-red-900 w-5 h-5 cursor-pointer"
                    onClick={() => {
                      setDeleteDialogOpen(true);
                      setSchemeId(scheme_id);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ModalComp isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteScheme} />
    </div>


  );
}
