const { GoogleGenerativeAI } = require('@google/generative-ai');
const mongoose = require('mongoose');

const DistrictOfficer = require('../models/district-officer.model');
const Message = require('../models/message.model');
const Officer = require('../models/officers.model');
const SchemeMonitoring = require('../models/scheme-monitor.model');
const Schemes = require('../models/scheme.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// OFFICERS
const officerNamesUpload = async (req, res) => {
    try {
        const officerData = req.body.data;
        // console.log('Officer Data:', officerData)
        if (!officerData || !Array.isArray(officerData)) {
            return ApiResponse(400, 'Please provide an array of officer data', null, res);
        }

        await Promise.all(officerData.map(async (officer) => {
            const { name, email } = officer;
            await Officer.create({ officerName: name, officerEmail: email });
        }));

        return ApiResponse(201, 'Officers Data uploaded successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const getAllOfficersNames = async (req, res) => {
    try {
        const officerData = await Officer.find();
        return ApiResponse(200, 'Officers data fetched Successfully', officerData, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const officerDistrict = async (req, res) => {
    try {
        const { state, district, officerName, officerEmail, mapUrl } = req.body;

        // Check if officer with the provided email is already assigned to any district
        const existingOfficer = await DistrictOfficer.findOne({ "states.districts.officer.officerEmail": officerEmail });
        if (existingOfficer) {
            return ApiResponse(400, 'Officer is already assigned to a district', null, res);
        }

        // Find if the state already exists
        let existingState = await DistrictOfficer.findOne({ "states.stateName": state });
        if (!existingState) {
            // If the state doesn't exist, create a new entry
            existingState = new DistrictOfficer({
                states: [
                    {
                        stateName: state,
                        districts: [{ districtName: district, officer: [{ officerName, officerEmail }], mapUrl: mapUrl }]
                    }
                ]
            });
        } else {
            // If the state exists, check if the district exists
            const existingDistrict = existingState.states[0].districts.find(d => d.districtName === district);
            if (!existingDistrict) {
                // If the district doesn't exist, add it to the existing state
                existingState.states[0].districts.push({ districtName: district, officer: [{ officerName, officerEmail }], mapUrl: mapUrl });
            } else {
                // If the district already exists, check if it has an officer assigned
                if (existingDistrict.officer.length > 0) {
                    return ApiResponse(400, 'District already has an officer assigned', null, res);
                } else {
                    existingDistrict.officer.push({ officerName, officerEmail });
                    existingDistrict.mapUrl = mapUrl;
                }
            }
        }

        await existingState.save();

        return ApiResponse(200, 'Officer Assigned Successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const officerDistrictData = async (req, res) => {
    try {
        const districtOffiicersData = await DistrictOfficer.find();
        return ApiResponse(200, 'District Officers Data', districtOffiicersData, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const officerDistrictDelete = async (req, res) => {
    try {
        const districtId = req.query.id;
        const stateId = req.query.stateId;

        // console.log('districtId:', districtId);
        // console.log('stateId:', stateId);

        const data = await DistrictOfficer.findOneAndUpdate(
            { "states._id": stateId },
            { $pull: { "states.$.districts": { _id: districtId } } },
            { new: true }
        );

        // console.log('Deleted data:', data);

        if (!data) {
            return ApiResponse(404, 'District not found', null, res);
        }

        // console.log('Deleted district:', data);
        return ApiResponse(200, 'District Deleted Successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const officerDistrictEdit = async (req, res) => {
    try {
        const { id, stateId } = req.query;
        const { officer } = req.body;

        const districtOfficer = await DistrictOfficer.findOneAndUpdate(
            {
                "states._id": stateId,
                "states.districts._id": id
            },
            {
                $set: { "states.$[s].districts.$[d].officer": officer }
            },
            {
                arrayFilters: [{ "s._id": stateId }, { "d._id": id }],
                new: true,
                useFindAndModify: false
            }
        );

        if (!districtOfficer) {
            return ApiResponse(404, 'District Officer not found', null, res);
        }

        return ApiResponse(200, 'District Officer Updated Successfully', districtOfficer, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const addOfficer = async (req, res) => {
    try {
        const { officerName, officerEmail } = req.body;
        // console.log(req.body);
        const existingOfficer = await Officer.findOne({ officerEmail });
        if (existingOfficer) {
            return ApiResponse(400, 'Officer already exists', null, res);
        }
        await Officer.create({ officerName, officerEmail });
        return ApiResponse(201, 'Officer added successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const deleteOfficer = async (req, res) => {
    try {
        const id = req.query.id;
        await Officer.findByIdAndDelete(id);
        return ApiResponse(200, 'Officer deleted Successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const editOfficer = async (req, res) => {
    try {
        const { officerName, officerEmail } = req.body;
        const id = req.query.id;
        const existingOfficer = await Officer.findById(id);
        if (!existingOfficer) {
            return ApiResponse(404, 'Officer not found', null, res);
        }
        existingOfficer.officerName = officerName;
        existingOfficer.officerEmail = officerEmail;
        await existingOfficer.save();
        return ApiResponse(200, 'Officer updated successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const getSingleOfficer = async (req, res) => {
    try {
        const officerEmail = req.query.email;
        const officer = await DistrictOfficer.findOne({ "states.districts.officer.officerEmail": officerEmail });

        if (!officer) {
            return ApiResponse(404, 'Officer not found', null, res);
        }

        let officerData = [];

        officer.states.forEach(state => {
            state.districts.forEach(district => {
                district.officer.forEach(officer => {
                    if (officer.officerEmail === officerEmail) {
                        officerData.push({
                            state: state.stateName,
                            district: district.districtName,
                            mapUrl: district.mapUrl
                        });
                    }
                });
            });
        });

        if (officerData.length === 0) {
            return ApiResponse(404, 'District not found for the officer', null, res);
        }

        return ApiResponse(200, 'Officer Data', officerData, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};


// GOVT SCHEMES
const governmentSchemes = async (req, res) => {
    try {
        const { scheme, objective, description, parameters } = req.body;
        await Schemes.create({ govt_scheme: scheme, objective, description, parameters });
        return ApiResponse(201, 'Government Scheme added successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const allGovernmentSchemes = async (req, res) => {
    try {
        const allSchemes = await Schemes.find();
        return ApiResponse(200, 'All Government Schemes', allSchemes, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const governmentSchemesDelete = async (req, res) => {
    try {
        const id = req.query.id;
        // console.log(id);
        await Schemes.findByIdAndDelete(id);
        return ApiResponse(200, 'Govt Scheme deleted Successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const getSingleScheme = async (req, res) => {
    try {
        const schemeName = req.query.name;
        const scheme = await Schemes.find({ govt_scheme: schemeName });
        if (!scheme) {
            return ApiResponse(404, 'Scheme not found', null, res);
        }
        // console.log(scheme[0].parameters);
        return ApiResponse(200, 'Scheme Data', scheme[0].parameters, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const getSingleSchemeDetails = async (req, res) => {
    try {
        const schemeName = req.query.name;
        const scheme = await Schemes.findOne({ govt_scheme: schemeName });
        if (!scheme) {
            return ApiResponse(404, 'Scheme not found', null, res);
        }
        return ApiResponse(200, 'Scheme Data', scheme, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const editGovernmentSchemes = async (req, res) => {
    try {
        const { scheme, objective, description, parameters } = req.body;
        const name = req.query.name;

        const existingScheme = await Schemes.findOne({ govt_scheme: name });
        if (!existingScheme) {
            return ApiResponse(404, 'Scheme not found', null, res);
        }

        existingScheme.govt_scheme = scheme;
        existingScheme.objective = objective;
        existingScheme.description = description;
        existingScheme.parameters = parameters;

        await existingScheme.save();
        return ApiResponse(200, 'Scheme Updated Successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};


// SCHEME MONITORING
const addSchemeMonitoring = async (req, res) => {
    try {
        const { govt_scheme, district, parameters, state } = req.body;
        let existingScheme = await SchemeMonitoring.findOne({ govt_scheme, district, state });

        if (existingScheme) {
            // If scheme monitoring already exists, update parameters
            parameters.forEach(({ name, value }) => {
                const existingParameter = existingScheme.parameters.find(param => param.name === name);
                if (existingParameter) {
                    if (!Array.isArray(existingParameter.value)) {
                        existingParameter.value = [existingParameter.value];
                    }
                    existingParameter.value.push(value);
                } else {
                    existingScheme.parameters.push({ name, value: [value] });
                }
            });
            await existingScheme.save();
            return ApiResponse(200, 'Parameters updated in Scheme Monitoring successfully', null, res);
        }

        await SchemeMonitoring.create({ govt_scheme, district, parameters, state });
        return ApiResponse(201, 'Scheme Monitoring added successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const getSingleSchemeMonitoring = async (req, res) => {
    try {
        const { name, district } = req.query;
        // console.log('name, district:', name, district)
        const schemeMonitoring = await SchemeMonitoring.findOne({ govt_scheme: name, district });
        if (!schemeMonitoring) {
            return ApiResponse(400, 'Scheme Monitoring not found', null, res);
        }
        return ApiResponse(200, 'Scheme Monitoring Data', schemeMonitoring, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }

};

const getSingleDistrictScheme = async (req, res) => {
    try {
        const { district } = req.query;
        const districtSchemes = await SchemeMonitoring.find({ district });
        if (!districtSchemes) {
            return ApiResponse(400, 'District Scheme not found', null, res);
        }
        return ApiResponse(200, 'District Scheme Data', districtSchemes, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

const getSingleStateProgress = async (req, res) => {
    try {
        const { state, district } = req.query;
        const stateProgress = await SchemeMonitoring.find({ state, district });
        if (!stateProgress) {
            return ApiResponse(400, 'State Progress not found', null, res);
        }
        // console.log(stateProgress);
        return ApiResponse(200, 'State Progress Data', stateProgress, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};

// SCHEME FEEDBACK
const addSchemeFeedback = async (req, res) => {
    try {
        const { govt_scheme, district, feedback_type, feedback_desc } = req.body;

        const existingScheme = await SchemeMonitoring.findOne({ govt_scheme, district });

        if (!existingScheme) {
            return ApiResponse(404, 'Scheme not found', null, res);
        }

        let feedbackType;
        switch (feedback_type) {
            case 'IssueReport':
                feedbackType = 'IssueReport';
                break;
            case 'Suggestion':
                feedbackType = 'Suggestion';
                break;
            case 'GeneralFeedback':
                feedbackType = 'GeneralFeedback';
                break;
            default:
                return ApiResponse(400, 'Invalid feedback type', null, res);
        }

        existingScheme.feedback.push({ type: feedbackType, description: feedback_desc });

        await existingScheme.save();

        return ApiResponse(200, 'Feedback added successfully', existingScheme, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
}

const schemeFeedbacks = async (req, res) => {
    try {
        const { govt_scheme, district } = req.query;
        const feedbacks = await SchemeMonitoring.find({ govt_scheme, district }, { feedback: 1 });
        return ApiResponse(200, 'Scheme Feedbacks', feedbacks, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};


//MESSAGES
const getMessages = async (req, res) => {
    try {
        const receiver = req.query.receiver;
        // console.log(receiver);
        const messages = await Message.find({ receiver });
        return ApiResponse(200, 'Messages', messages, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
};


// SCHEME EXPLORER
const modelName = 'gemini-pro';
const apiKey = process.env.API_KEY;
const generativeAI = new GoogleGenerativeAI(apiKey);
const exploreSchemes = async (req, res) => {
    try {
        // const { scheme } = req.query;
        const prompt = req.body.prompt;
        // console.log("Prompt:", prompt);

        const model = generativeAI.getGenerativeModel({ model: modelName });
        const response = await model.generateContent([prompt]);

        const generatedText = response?.response?.text();
        if (!generatedText) {
            return ApiResponse(400, 'Failed to generate response', null, res);
        }
        // console.log("Response:", response);
        // console.log("Generated Text:", generatedText);
        return ApiResponse(200, 'Generated', { response: generatedText }, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
}

module.exports = {
    officerNamesUpload, getAllOfficersNames, officerDistrict, officerDistrictData
    , officerDistrictDelete, officerDistrictEdit, governmentSchemes, allGovernmentSchemes,
    governmentSchemesDelete, addOfficer, deleteOfficer, editOfficer, getSingleOfficer, getSingleScheme,
    addSchemeMonitoring, getSingleSchemeMonitoring, getSingleDistrictScheme, getSingleStateProgress,
    editGovernmentSchemes, getSingleSchemeDetails, addSchemeFeedback, schemeFeedbacks, getMessages,
    exploreSchemes
};