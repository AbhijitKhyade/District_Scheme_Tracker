import { Input, Typography, Card, Modal } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../../components/Button';
import { FaEdit } from 'react-icons/fa';
import { MdDelete, MdSave } from 'react-icons/md';
import axios from 'axios';
import { BASE_URL } from '../../api';
import ModalComp from '../../components/ModalComp';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Manage_Officers() {
    const [formData, setFormData] = useState({
        officerName: "",
        officerEmail: "",
    });
    const [officers, setOfficers] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedOfficer, setEditedOfficer] = useState({});
    const [officer_Id, setOfficer_Id] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleAddOfficer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/admin/add-officer`, formData);
            // console.log('response:', response.data);
            toast.success('Officer Added Successfully', {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getAllOfficers();
            setFormData({
                officerName: "",
                officerEmail: "",
            });
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const getAllOfficers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/get-officers-names`);
            console.log(response.data.data)
            setOfficers(response.data.data);
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const handleDeleteOfficer = async () => {
        try {
            const response = await axios.delete(`${BASE_URL}/admin/delete-officer?id=${officer_Id}`);
            // console.log('response:', response.data);
            toast.success('Officer Deleted Successfully', {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setDeleteDialogOpen(false);
            getAllOfficers();
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const handleEdit = (officer) => {
        setEditedOfficer(officer);
        setEditMode(true);
    }

    const handleSave = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/admin/edit-officer?id=${editedOfficer._id}`, editedOfficer);
            // console.log('response:', response.data);
            toast.success('Officer Updated Successfully', {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setEditMode(false);
            getAllOfficers();
        } catch (error) {
            console.log('Error:', error);
        }
    }

    useEffect(() => {
        getAllOfficers();
    }, []);
    const isDisabled = !formData.officerName || !formData.officerEmail;
    return (
        <div className='m-2 px-4'>
            <Typography color="blueGray" variant='h3' size="2xl" font="bold">
                Manage Officers
            </Typography>
            <form onSubmit={handleAddOfficer}>
                <div className='mt-4 flex flex-col sm:flex-row items-center justify-center gap-5 w-full'>
                    <div className='w-full sm:w-1/2'>
                        <Input
                            type="text"
                            placeholder="Enter Officer's Name"
                            name="officerName"
                            label="Officer's Name"
                            value={formData.officerName}
                            onChange={handleInputChange}
                            outline={false}
                            size="lg"
                            fullWidth
                        />
                    </div>
                    <div className='w-full sm:w-1/2'>
                        <Input
                            type="text"
                            placeholder="Enter Officer's Email"
                            name="officerEmail"
                            label="Officer's Email"
                            value={formData.officerEmail}
                            onChange={handleInputChange}
                            outline={false}
                            size="lg"
                            fullWidth
                        />
                    </div>
                    <div className='w-full sm:w-auto'>
                        <ButtonComp name={editMode ? 'Save' : 'Add'} type="submit" disabled={isDisabled} onClick={editMode ? handleSave : handleAddOfficer} />
                    </div>
                </div>
            </form>
            <div className='mt-10 mb-4'>
                <Card className="h-full w-full overflow-scroll">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" className="leading-none font-semibold text-black">
                                            Officer Name
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" className="leading-none font-semibold text-black">
                                            Officer Email
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
                                {officers.map((officer, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-blue-gray-50" : ""}>
                                        <td className="p-4">
                                            {editMode && editedOfficer._id === officer._id ? (
                                                <Input
                                                    type="text"
                                                    value={editedOfficer.officerName}
                                                    onChange={(e) => setEditedOfficer({ ...editedOfficer, officerName: e.target.value })}
                                                />
                                            ) : (
                                                <Typography variant="body2" color="textPrimary" className="font-normal">
                                                    {officer.officerName}
                                                </Typography>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {editMode && editedOfficer._id === officer._id ? (
                                                <Input
                                                    type="text"
                                                    value={editedOfficer.officerEmail}
                                                    onChange={(e) => setEditedOfficer({ ...editedOfficer, officerEmail: e.target.value })}
                                                />
                                            ) : (
                                                <Typography variant="body2" color="textPrimary" className="font-normal">
                                                    {officer.officerEmail}
                                                </Typography>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {editMode && editedOfficer._id === officer._id ? (
                                                <MdSave className="text-green-600 hover:text-green-900 w-5 h-5 cursor-pointer" onClick={handleSave} />
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <FaEdit className="text-blue-600 hover:text-blue-900 w-5 h-5 cursor-pointer" onClick={() => handleEdit(officer)} />
                                                    <MdDelete className="text-red-600 hover:text-red-900 w-5 h-5 cursor-pointer" onClick={() => {
                                                        setOfficer_Id(officer._id);
                                                        setDeleteDialogOpen(true);
                                                    }} />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            <ModalComp isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteOfficer} />
        </div >
    )
};
