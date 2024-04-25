import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  Typography,
  Card,
  Input,
} from "@material-tailwind/react";
import { MdDelete, MdCloudUpload, MdManageAccounts, MdSave } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ButtonComp from '../../components/Button';
import { districtMaps, states_districts } from '../../data';
import UploadModal from '../../components/UploadModal';
import axios from 'axios';
import { BASE_URL } from '../../api';
import { Link } from 'react-router-dom';
import ModalComp from '../../components/ModalComp';


export default function District_Officers() {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    officerName: "",
    officerEmail: "",
    mapUrl: "",
  });
  const [officers, setOfficers] = useState([]);
  const [officersEmail, setOfficersEmail] = useState([]);
  const [districtOfficers, setDistrictOfficers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete confirmation dialog
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedDistrict, setEditedDistrict] = useState({});

  const handleInputChange = (selectedOption, { name }) => {
    const selectedValue = selectedOption ? selectedOption.value : "";

    setFormData({
      ...formData,
      [name]: selectedValue,
    });
  };



  const handleAssignOfficer = async () => {
    console.log('formData', formData);
    try {
      const response = await axios.post(`${BASE_URL}/admin/officer-district-relation`, formData);
      console.log(response.data.data);
      await getDistrictOfficers(); // Refresh district officers data
      setFormData({
        state: "",
        district: "",
        officerName: "",
        officerEmail: "",
        mapUrl: "",
      });

    } catch (error) {
      console.log('Error: ', error.response.data.message);

    }
  };

  const getOfficers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-officers-names`);
      // console.log('Officers:', response?.data?.data);
      const officersData = response?.data?.data;
      let officersNames = [], officersEmails = [];
      officersData.forEach(officer => {
        officersNames.push(officer.officerName);
      });
      officersData.forEach(officer => {
        officersEmails.push(officer.officerEmail);
      });
      console.log(officersData);
      setOfficersEmail(officersEmails);
      setOfficers(officersNames);
    } catch (error) {
      console.error('Error getting officers:', error);
    }
  }

  const getDistrictOfficers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/officer-district-data`);
      console.log('District Officers:', response?.data?.data);
      setDistrictOfficers(response?.data?.data);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  useEffect(() => {
    getOfficers();
    getDistrictOfficers();
  }, []);

  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`${BASE_URL}/admin/officer-district-delete?id=${selectedDeleteId}&stateId=${selectedStateId}`);
      await getDistrictOfficers(); // Refresh district officers data
    } catch (error) {
      console.error('Error deleting district officer:', error);
    }
    setDeleteDialogOpen(false);
  };

  const handleEdit = (district) => {
    setEditMode(district._id);
    setEditedDistrict({ ...district });
  };

  const handleSave = async () => {
    try {
      console.log('selectedStateId:', selectedStateId);
      const { officer, ...editedDistrictWithoutOfficer } = editedDistrict;
      const editedData = {
        ...editedDistrictWithoutOfficer,
        officer: [{ officerName: officer[0].officerName, officerEmail: officer[0].officerEmail }]
      };
      const response = await axios.put(`${BASE_URL}/admin/officer-district-edit?id=${editedDistrict._id}&stateId=${selectedStateId}`, editedData);
      setEditMode(null);
      await getDistrictOfficers();
    } catch (error) {
      console.error('Error updating district officer:', error);
    }
  };




  return (
    <div className='m-2 px-4'>
      <div className="flex flex-col items-center ">
        <div className='flex items-center justify-between lg:w-full'>
          <div className='self-center'>
            <Typography variant='h3' >Assign District Officers</Typography>
          </div>
          <div>
            <p className='cursor-pointer' onClick={() => setIsModalOpen(true)}>
              <MdManageAccounts className='w-8 h-8' />
            </p>
          </div>
        </div>
        <div className="lg:w-3/4 md:w-full mt-4 mb-4 sm:w-full">
          <Typography variant='h5' >State</Typography>
          <Select
            options={states_districts?.map(state =>
              ({ value: state.state, label: state.state }))}
            name="state"
            onChange={(value) => handleInputChange(value, { name: "state" })}
            placeholder="Select State"
            classNamePrefix="select"
          />
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <div className="flex items-center justify-center gap-5  mx-3 w-full sm:flex-col lg:flex-row">
          <div className="w-1/2 sm:w-full">
            <Typography variant='h5'>Districts</Typography>
            <Select
              options={states_districts?.find(state => state.state === formData.state)?.districts?.map(district =>
                ({ value: district, label: district }))}
              name='district'
              isDisabled={!formData.state}
              placeholder="Select District"
              classNamePrefix="select"
              onChange={(value) => handleInputChange(value, { name: "district" })}
            />
          </div>
          <div className="w-1/2 sm:w-full">
            <Typography variant='h5'>Map Url</Typography>
            <Select
              options={Object.keys(districtMaps).map(map =>
                ({ value: districtMaps[map], label: map }))}
              name="mapUrl"
              onChange={(value) => handleInputChange(value, { name: "mapUrl" })}
              placeholder="Select Map"
              classNamePrefix="select"
              isDisabled={!formData.state || !formData.district}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-5  mx-3 w-full sm:flex-col lg:flex-row mt-4">
          <div className="w-1/2 sm:w-full">
            <Typography variant='h5'>Officers</Typography>
            <Select
              options={officers?.map(officer => ({ value: officer, label: officer }))}
              name='officerName'
              onChange={(value) => handleInputChange(value, { name: "officerName" })}
              isDisabled={!formData.state || !formData.district}
              placeholder="Select Officer"
              classNamePrefix="select"
            />
          </div>
          <div className="w-1/2 sm:w-full">
            <Typography variant='h5'>Officers Email</Typography>
            <Select
              options={officersEmail?.map(officer => ({ value: officer, label: officer }))}
              name='officerEmail'
              onChange={(value) => handleInputChange(value, { name: "officerEmail" })}
              isDisabled={!formData.district || !formData.officerName}
              placeholder="Select Officer Email"
              classNamePrefix="select"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col justify-center items-center">
          {formData.district && formData.officerName && formData.officerEmail && (
            <div>
              <p>Selected State: {formData.state}</p>
              <p>Selected District: {formData.district}</p>
              <p>Selected Officer: {formData.officerName}</p>
            </div>
          )}
          <ButtonComp name={"Assign Officer"} onClick={handleAssignOfficer} type={'submit'} disabled={!formData.district || !formData.officer} className={'font-bold py-3 px-4 rounded-md mt-2 cursor-pointe'} fullWidth />
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='flex justify-between items-center'>
          <Typography variant='h3'>
            Districts and Officers
          </Typography>
          <Link to={'/admin/manage-officers'}>
            <ButtonComp name={"Manage Officers"} type={'button'} className={'font-bold py-3 px-4 rounded-md mt-2 cursor-pointe'} />
          </Link>
        </div>
        <div className="overflow-auto mt-4">
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" className="leading-none font-semibold text-black">
                      State
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" className="leading-none font-semibold text-black">
                      District
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" className="leading-none font-semibold text-black">
                      Officer
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" className="leading-none font-semibold text-black">
                      Actions
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {districtOfficers.map((districtOfficer) => (
                  <React.Fragment key={districtOfficer._id}>
                    {districtOfficer.states.map((state) => (
                      <React.Fragment key={state._id}>
                        {state.districts.map((district) => (
                          <tr key={district._id} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                              <Typography variant="body2" color="textPrimary" className="font-normal">
                                {state.stateName}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography variant="body2" color="textPrimary" className="font-normal">
                                {district.districtName}
                              </Typography>
                            </td>
                            <td className="p-4">
                              {editMode === district._id ? (
                                <Input
                                  type="text"
                                  value={editedDistrict.officer[0].officerName} // Updated this line
                                  onChange={(e) => setEditedDistrict({ ...editedDistrict, officer: [{ ...editedDistrict.officer[0], officerName: e.target.value }, editedDistrict.officer[1]] })}
                                />
                              ) : (
                                <Typography variant="body2" color="textPrimary" className="font-normal">
                                  {district.officer[0].officerName} {/* Updated this line */}
                                </Typography>
                              )}
                            </td>
                            <td className="p-4">
                              {editMode === district._id ? (
                                <MdSave className="text-green-600 hover:text-green-900 w-5 h-5 cursor-pointer" onClick={handleSave} />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <FaEdit className="text-blue-600 hover:text-blue-900 w-5 h-5 cursor-pointer" onClick={() => {
                                    handleEdit(district);
                                    setSelectedStateId(state._id);
                                  }} />
                                  <MdDelete className="text-red-600 hover:text-red-900 w-5 h-5 cursor-pointer" onClick={() => {
                                    setSelectedDeleteId(district._id);
                                    setSelectedStateId(state._id);
                                    setDeleteDialogOpen(true);
                                  }} />
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

          </Card>
        </div>
      </div>

      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ModalComp isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirmation} />

    </div >
  );
}
