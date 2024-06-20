import React, { useState } from 'react';
import { MdCloudUpload } from "react-icons/md";
import axios from 'axios';
import { BASE_URL } from '../api';
import * as XLSX from 'xlsx';

const UploadModal = ({ isOpen, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    // const stopPropagation = (e) => {
    //     e.stopPropagation();
    // };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    const excelData = XLSX.utils.sheet_to_json(sheet);

                    // Convert excelData to the desired format
                    const formattedData = Object.values(excelData);
                    // console.log('data to send:', formattedData);
                    // Send the excelData to the backend
                    const response = await axios.post(`${BASE_URL}/admin/officers-uploads`, { data: formattedData });
                    // console.log('Data uploaded successfully:', response.data);
                    onClose();
                };
                reader.readAsArrayBuffer(selectedFile);
            } else {
                console.log('No file selected');
                alert('Please select a file to upload');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`} onClick={onClose}>
            <div className="bg-white w-96 p-5 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className='w-full flex flex-col justify-center items-center gap-3 '>
                    <div className='text-lg text-gray-800'>Upload Excel file of officers list: </div>
                    <label className='w-full h-full relative'>
                        <input
                            type='file'
                            accept='.xls, .xlsx'
                            className='absolute inset-0 opacity-0 cursor-pointer'
                            onChange={handleFileChange}
                        />
                        <div className='outline-none border border-gray-700 rounded-lg p-2 flex items-center justify-center'>
                            <MdCloudUpload className='w-6 h-6 mr-2' />
                            <span className='text-gray-700'>Choose Excel File</span>
                        </div>
                    </label>
                </div>
                <div className='mt-2 mb-2'>
                    <p>View reference: <a href="/sample.xlsx" target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:text-blue-700' onClick={onClose}>Download Sample Excel File</a></p>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
                    <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded-md">Upload</button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
