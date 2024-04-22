import React, { useState } from 'react';
import { Input, Textarea, Typography } from "@material-tailwind/react";
import ButtonComp from '../../components/Button';
import { MdEdit, MdDelete } from "react-icons/md";

export default function GovtSchemes() {
  const [formData, setFormData] = useState({
    scheme: "",
    objective: "",
    description: "",
  });
  const [showSchemes, setShowSchemes] = useState(false);

  const [schemes, setSchemes] = useState([
    { id: 1, scheme: "Scheme 1", objective: "Objective 1", description: "Description 1" },
    { id: 2, scheme: "Scheme 2", objective: "Objective 2", description: "Description 2" },
    { id: 3, scheme: "Scheme 3", objective: "Objective 3", description: "Description 3" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Here you can implement the logic to handle form submission
    console.log(formData);
  };

  const handleSchemeChange = () => {
    setShowSchemes(!showSchemes);
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
        <div className='mt-4 w-full flex justify-between sm:w-1/2'>
          <ButtonComp
            name={"Add Scheme"}
            onClick={handleSubmit}
            type={'submit'}
            className={'font-bold py-3 px-4 rounded-md mt-2 cursor-pointe'}
            fullWidth
          />
          <ButtonComp
            name={"Show Schemes"}
            type={'button'}
            onClick={handleSchemeChange}
            className={'font-bold py-3 px-4 rounded-md mt-2 cursor-pointe'}
            fullWidth
          />
        </div>
      </div>

      {showSchemes && (
        <div className='mt-8 w-full sm:w-1/2 mx-auto'>
          <Typography color="blueGray" className='text-2xl font-bold'>Government Schemes</Typography>
          <ul className="list-disc mt-4">
            {schemes.map((scheme) => (
              <li key={scheme.id} className="text-lg flex items-center justify-between">
                <span>{scheme.scheme}</span>
                <div className="flex items-center space-x-2">
                  <MdEdit className="text-blue-600 hover:text-blue-900 w-5 h-5 cursor-pointer" />
                  <MdDelete className="text-red-600 hover:text-red-900 w-5 h-5 cursor-pointer" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
