import React, { useState, Suspense } from 'react';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import axios from 'axios';
import Loader from '../../components/Loader';
import { BASE_URL } from '../../api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SchemeExplore = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/admin/scheme-explorer`, { prompt: query });
            if (response.status === 200) {
                setResults(response.data.data.response.split('\n\n').map(parseScheme));
            } else {
                setLoading(false);
                console.error("Failed to fetch scheme details:", response);
                toast.error('Refresh the page and try again', {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('Refresh the page and try again', {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
            console.error("Error fetching scheme details:", error);
        }
    };

    // Function to parse each scheme detail into title and description with bullet points
    // const parseScheme = (scheme) => {
    //     const matches = scheme.match(/^(\d+\.|[*-]) (.*)/gm); // Match lines starting with a number or bullet point
    //     if (!matches) return { title: "", details: scheme }; // Return as is if no matches found

    //     const title = matches[0].replace(/^(\d+\.|[*-]) /, ''); // Remove number/bullet from title
    //     const details = matches.slice(1).map(line => line.replace(/^(\d+\.|[*-]) /, '')).join('\n'); // Remove number/bullet from details
    //     return { title, details };
    // };

    const parseScheme = (scheme) => {
        const boldRegex = /\*\*(.*?)\*\*/g; // Regex to match **text**
        const parts = scheme.split(boldRegex); // Split text based on bold pattern

        const parsedParts = parts.map((part, index) => {
            if (index % 2 === 1) {
                // Odd indices (matched bold patterns)
                return <strong key={index}>{part}</strong>;
            } else {
                // Even indices (non-bold parts)
                return part.split('*').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>);
            }
        });

        return { content: parsedParts };
    };
    const querySuggestions = [
        "Benefits of PM-Kisan Yojana",
        "Objectives of Digital India Programme",
        "Eligibility criteria for Ayushman Bharat Scheme",
        "Funding details of Make in India Initiative",
        "Recent updates on Atmanirbhar Bharat Abhiyan",
        "Details of Swachh Bharat Mission initiatives",
        "Overview of National Health Protection Scheme (Ayushman Bharat)",
        "Impact of Skill India Mission",
    ];
    const isDisabled = !query;
    return (
        <div className='m-2 px-4 h-auto'>
            <Typography variant='h3' size='xl'>Scheme Exploration</Typography>
            <div className="mb-4 mt-4 flex gap-4 justify-center items-center md:flex-col sm:flex-col lg:flex-row sm:items-start">
                <Input
                    type="text"
                    label='Search for Schemes'
                    placeholder="Search for Schemes"
                    className="border-2 border-gray-300 p-2 rounded"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {!loading ?
                    <>
                        <Button
                            color="black"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                            onClick={handleSearch}
                            disabled={isDisabled}
                        >
                            Explore
                        </Button>
                    </> : (
                        <>
                            <Loader />
                        </>)}

            </div>


            <div className="flex gap-3 flex-wrap mt-2 w-full mb-4">
                {querySuggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        color="gray"
                        buttonType="link"
                        className='cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full text-sm lg:text-base px-4 py-2 text-center '
                        size="regular"
                        rounded={true}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                        onClick={() => setQuery(suggestion)}
                    >
                        {suggestion}
                    </div>
                ))}
            </div>



            {results.length > 0 && (
                <div className="border-2 border-gray-300 p-4 rounded mb-2">
                    {results.map((result, index) => (
                        <div key={index}>
                            <Typography variant='body1' component='p' className="mt-2 text-justify">
                                {result.content}
                            </Typography>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SchemeExplore;
