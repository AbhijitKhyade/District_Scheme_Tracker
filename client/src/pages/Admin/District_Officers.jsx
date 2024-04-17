import React, { useState } from 'react';
import Select from 'react-select';
import {
  Typography,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const options = [
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Gujarat', label: 'Gujarat' },
];

const districtsData = {
  Maharashtra: ['Pune', 'Solpaur', 'Sangali'],
  Karnataka: ['District A', 'District B', 'District C'],
  'Tamil Nadu': ['District X', 'District Y', 'District Z'],
  'Uttar Pradesh': ['District I', 'District II', 'District III'],
  Gujarat: ['District P', 'District Q', 'District R'],
};

const officersData = ['Officer A', 'Officer B', 'Officer C', 'Officer D', 'Officer E'];
const dummyData = [
  { district: 'Pune', officer: 'Officer A' },
  { district: 'Solapur', officer: 'Officer B' },
  { district: 'Sangli', officer: 'Officer C' },
  { district: 'District A', officer: 'Officer D' },
  { district: 'District B', officer: 'Officer E' },
];

export default function District_Officers() {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    officer: "",
  });

  const handleInputChange = (selectedOption, { name }) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    console.log(selectedValue) // Extract the value from the selectedOption object
    setFormData({
      ...formData,
      [name]: selectedValue,
    });
  };



  const handleAssignOfficer = () => {
    console.log('formData', formData);
  };

  return (
    <div className='m-2 px-4'>
      <div className="flex flex-col items-center ">
        <Typography variant='h3'>Assign District Officers</Typography>
        <div className="w-3/4 mt-4 mb-4">
          <Select
            options={options}
            name="state"
            onChange={(value) => handleInputChange(value, { name: "state" })}
            placeholder="Select State"
            classNamePrefix="select"
          />
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <div className="flex items-center justify-center gap-5  mx-3 w-full">
          <div className="w-1/2">
            <Typography variant='h5'>Districts</Typography>
            <Select
              options={formData.state ? districtsData[formData.state].map(district => ({ value: district, label: district })) : []}
              name='district'

              isDisabled={!formData.state}
              placeholder="Select District"
              classNamePrefix="select"
              onChange={(value) => handleInputChange(value, { name: "district" })}
            />
          </div>
          <div className="w-1/2">
            <Typography variant='h5'>Officers</Typography>
            <Select
              options={officersData?.map(officer => ({ value: officer, label: officer }))}
              name='officer'
              onChange={(value) => handleInputChange(value, { name: "officer" })}
              isDisabled={!formData.state || !formData.district}
              placeholder="Select Officer"
              classNamePrefix="select"
            />
          </div>
        </div>
        <div className="mt-4">
          {formData.district && formData.officer && (
            <div>
              <p>Selected District: {formData.district.label}</p>
              <p>Selected Officer: {formData.officer.label}</p>
            </div>
          )}
          <Button
            className="font-bold py-2 px-4 rounded mt-2 cursor-pointer"
            onClick={handleAssignOfficer}
            disabled={!formData.district || !formData.officer}
          >
            Assign Officer
          </Button>
        </div>
      </div>
      <div className='flex flex-col'>
        <Typography variant='h3'>
          Districts and Officers
        </Typography>
        <div className="overflow-auto mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                  District
                </th>
                <th scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Officer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{data.district}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{data.officer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <FaEdit className="text-gray-500 cursor-pointer" />
                      <MdDelete className="text-red-500 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
