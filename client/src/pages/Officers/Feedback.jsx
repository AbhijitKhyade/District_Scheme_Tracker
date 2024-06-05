import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../api';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Select from 'react-select';


const Feedback = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [district, setDistrict] = useState('');
    const [scheme, setScheme] = useState('');
    const [schemeNames, setSchemeNames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;


    const handleInputChange = (value, { name }) => {
        setScheme(value.value);
    };

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
    };

    const getFeedbacks = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/admin/scheme-feedbacks?district=${district}&govt_scheme=${scheme}`);
            console.log(res.data.data[0].feedback);
            setFeedbacks(res.data.data[0].feedback);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getOfficerDistrict = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/get-single-officer?email=${currentUser.email}`);
            // console.log('response:', response.data.data);
            setDistrict(response.data.data[0].district);
        } catch (error) {
            console.log('error:', error);
        }
    };

    const renderFeedbacksByType = (type) => {
        const filteredFeedbacks = feedbacks.filter(feedback => feedback.type === type);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const selectedFeedbacks = filteredFeedbacks.slice(startIndex, startIndex + itemsPerPage);

        return selectedFeedbacks.map(feedback => (
            <Card key={feedback._id} className="w-full md:w-1/3 lg:w-1/4 p-4 m-4 border">
                <CardBody>
                    <p className="text-gray-700">{feedback.description}</p>
                </CardBody>
            </Card>
        ));
    };

    useEffect(() => {
        getSchemes();
        getOfficerDistrict();
    }, []);

    useEffect(() => {
        getFeedbacks();
    }, [scheme]);

    const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
    return (
        <div className='m-2 px-4'>
            <Typography className='text-center' color="blueGray" variant='h3' size="xl">Feedback</Typography>
            <div className='flex justify-center'>
                <div className="lg:w-3/4 w-full mt-4 mb-4">
                    <Select
                        options={schemeNames}
                        name="govt_scheme"
                        onChange={(value) => handleInputChange(value, { name: "govt_scheme" })}
                        placeholder="Select Scheme"
                        classNamePrefix="select"
                    />
                </div>
            </div>
            <div className='mt-3'>
                <div>
                    <h2 className="text-xl font-semibold mt-6 mb-2">Issue Reports</h2>
                    <div className="flex flex-wrap">
                        {renderFeedbacksByType('IssueReport')}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mt-6 mb-2">Suggestions</h2>
                    <div className="flex flex-wrap">
                        {renderFeedbacksByType('Suggestion')}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mt-6 mb-2">General Feedback</h2>
                    <div className="flex flex-wrap">
                        {renderFeedbacksByType('GeneralFeedback')}
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <Button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mx-2"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="mx-2"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Feedback;