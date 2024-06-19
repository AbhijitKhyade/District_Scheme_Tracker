import { Typography, Select, Option, Textarea, Input } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonComp from '../../components/Button';
import axios from 'axios';
import { BASE_URL } from '../../api';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SchemeAction() {
    const currentUser = useSelector(state => state.user.currentUser);
    const localtion = useLocation();
    const queryParams = new URLSearchParams(localtion.search);
    const name = queryParams.get('name');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        govt_scheme: name,
        feedback_type: "",
        feedback_desc: "",
        district: currentUser?.district,
    });
    const [schemes, setSchemes] = useState([]);


    const getAllSchemes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/all-govt-schemes`);
            // console.log('response:', response.data.data);
            const data = response.data.data;

            setSchemes(data);
        } catch (error) {
            console.log('error:', error);
        }
    }

    useEffect(() => {
        getAllSchemes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = () => {
        // console.log('formData:', formData);
        try {
            setLoading(true);
            const response = axios.post(`${BASE_URL}/admin/add-scheme-feedback`, formData);
            toast.success("Feedback submitted successfully", {
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
            navigate('/citizens/govt-schemes');

        } catch (error) {
            setLoading(false);
            console.log('error:', error);
        }
    }

    const isDisabled = !formData.feedback_type || !formData.feedback_desc;
    return (
        <div className='m-2 px-4'>
            <Typography variant='h3' size='xl'>Scheme Action</Typography>
            <div className='mt-4'>
                <div className='flex flex-col items-center justify-center w-full'>

                    <div className='w-full sm:w-1/2 mt-4'>
                        <Select label='Feedback Type' size="lg" name='feedback_type'
                            onChange={(value) =>
                                handleInputChange({
                                    target: { name: "feedback_type", value },
                                })
                            }
                        >
                            <Option value="" disabled>Select Feedback Type</Option>
                            <Option value="Suggestion" >Suggestion for improvement</Option>
                            <Option value="IssueReport">Issue Report</Option>
                            <Option value="GeneralFeedback">General Feedback</Option>
                        </Select>
                    </div>
                    <div className='mt-4 w-full sm:w-1/2'>
                        <Textarea
                            type="text"
                            placeholder="Feedback Description"
                            name="feedback_desc"
                            label='Feedback Description'
                            value={formData.feedback_desc}
                            onChange={handleInputChange}
                            outline={false}
                            size="lg"
                            fullWidth
                        />
                    </div>
                    <div className='mt-4 w-full flex justify-end sm:w-1/2'>
                        <ButtonComp
                            name={"Submit"}
                            onClick={handleSubmit}
                            type={'submit'}
                            className={'font-bold py-3 px-4 rounded-md mt-2 cursor-pointer'}
                            fullWidth
                            disabled={isDisabled}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
