import React from 'react';

import ButtonComp from './Button';

export default function ModalComp({ isOpen, onClose, onConfirm }) {
    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`} onClick={onClose}>
            <div className="bg-white w-96 p-5 rounded-lg shadow-lg mb-5"  >
                <div className='w-full flex flex-col justify-center items-center gap-3 '>
                    <p>Do you want to delete this record ?</p>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-blue-500 text-white rounded-md">Delete</button>
                </div>
            </div>
        </div>
    );
}
