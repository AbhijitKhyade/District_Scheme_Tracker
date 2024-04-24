const DistrictOfficer = require('../models/district-officer.model');
const Officer = require('../models/officers.model');
const Schemes = require('../models/scheme.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const mongoose = require('mongoose');


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
        // console.log('req.body:', req.body);
        // Find if the state already exists
        let existingState = await DistrictOfficer.findOne({ "states.stateName": state });
        let existingOfficer = await DistrictOfficer.findOne({ "states.districts.officer.officerEmail": officerEmail });
        if (existingOfficer) {
            return ApiResponse(400, 'Officer is already assigned to a district', null, res);
        }
        if (!existingState) {
            // If the state doesn't exist, create a new entry
            existingState = new DistrictOfficer({
                states: [
                    {
                        stateName: state,
                        districts: [{ districtName: district, officer: [{ officerName, officerEmail }], mapUrl: mapUrl }], // Include mapUrl here
                    }
                ]
            });
        } else {
            // If the state exists, check if the district exists
            const existingDistrict = existingState.states[0].districts.find(d => d.districtName === district);
            if (!existingDistrict) {
                // If the district doesn't exist, add it to the existing state
                existingState.states[0].districts.push({ districtName: district, officer: [{ officerName, officerEmail }], mapUrl: mapUrl }); // Include mapUrl here
            } else {
                // If the district already exists, check if the officer is already assigned
                const officerExists = existingDistrict.officer.some(o => o.officerName === officerName);
                if (officerExists) {
                    return ApiResponse(400, 'Officer is already assigned to this district', null, res);
                } else {
                    existingDistrict.officer = [{ officerName, officerEmail }];
                    existingDistrict.mapUrl = mapUrl; // Include mapUrl here
                }
            }
        }

        await existingState.save();

        return ApiResponse(200, 'Officer Assigned Successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
}


const officerDistrictData = async (req, res) => {
    try {
        const districtOffiicersData = await DistrictOfficer.find();
        return ApiResponse(200, 'District Officers Data', districtOffiicersData, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
}

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

        console.log('Deleted data:', data);

        if (!data) {
            return ApiResponse(404, 'District not found', null, res);
        }

        console.log('Deleted district:', data);
        return ApiResponse(200, 'District Deleted Successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
}

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
}

const deleteOfficer = async (req, res) => {
    try {
        const id = req.query.id;
        await Officer.findByIdAndDelete(id);
        return ApiResponse(200, 'Officer deleted Successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
}

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
}

const getSingleOfficer = async (req, res) => {
    try {
        const officerEmail = req.query.email;
        // console.log('officerEmail:', officerEmail);
        const officer = await DistrictOfficer.findOne({ "states.districts.officer.officerEmail": officerEmail });
        if (!officer) {
            return ApiResponse(404, 'Officer not found', null, res);
        }

        return ApiResponse(200, 'Officer Data', officer, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
}

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
}

const governmentSchemesDelete = async (req, res) => {
    try {
        const id = req.query.id;
        console.log(id);
        await Schemes.findByIdAndDelete(id);
        return ApiResponse(200, 'Govt Scheme deleted Successfully', null, res);
    } catch (error) {
        return ApiError(500, error.message, error, res);
    }
}





module.exports = {
    officerNamesUpload, getAllOfficersNames, officerDistrict, officerDistrictData
    , officerDistrictDelete, officerDistrictEdit, governmentSchemes, allGovernmentSchemes,
    governmentSchemesDelete, addOfficer, deleteOfficer, editOfficer, getSingleOfficer
};