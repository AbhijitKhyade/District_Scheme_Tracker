const express = require('express');
const { officerNamesUpload, getAllOfficersNames, officerDistrict,
    officerDistrictData, officerDistrictDelete, officerDistrictEdit,
    governmentSchemes, allGovernmentSchemes, governmentSchemesDelete, addOfficer,
    deleteOfficer, editOfficer, getSingleOfficer, getSingleScheme, addSchemeMonitoring,
    getSingleSchemeMonitoring, getSingleDistrictScheme, getSingleStateProgress,
    editGovernmentSchemes, getSingleSchemeDetails,
    addSchemeFeedback,
    schemeFeedbacks,
    getMessages
} = require('../controllers/admin.controller');

const router = express.Router();

//officers
router.post('/officers-uploads', officerNamesUpload);
router.get('/get-officers-names', getAllOfficersNames);
router.post('/officer-district-relation', officerDistrict);
router.get('/officer-district-data', officerDistrictData);
router.delete('/officer-district-delete', officerDistrictDelete);
router.put('/officer-district-edit', officerDistrictEdit);
router.post('/add-officer', addOfficer);
router.delete('/delete-officer', deleteOfficer);
router.put('/edit-officer', editOfficer);
router.get('/get-single-officer', getSingleOfficer);

//Govt-Schemes
router.post('/govt-schemes', governmentSchemes);
router.get('/all-govt-schemes', allGovernmentSchemes);
router.get('/get-single-scheme', getSingleScheme);
router.get('/get-single-scheme-details', getSingleSchemeDetails);
router.delete('/delete-govt-scheme', governmentSchemesDelete);
router.put('/edit-govt-scheme', editGovernmentSchemes);

// SCHEME MONITORING
router.post('/add-scheme-monitoring', addSchemeMonitoring);
router.get('/get-single-scheme-monitoring', getSingleSchemeMonitoring);
router.get('/get-single-district-scheme', getSingleDistrictScheme);
router.get('/get-single-state-progress', getSingleStateProgress);

//SCHEME FEEDBACK
router.post('/add-scheme-feedback', addSchemeFeedback);
router.get('/scheme-feedbacks', schemeFeedbacks);

//MESSAGES
router.get('/messages', getMessages);

module.exports = router;