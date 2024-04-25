const express = require('express');
const { officerNamesUpload, getAllOfficersNames, officerDistrict, officerDistrictData, officerDistrictDelete, officerDistrictEdit, governmentSchemes, allGovernmentSchemes, governmentSchemesDelete, addOfficer, deleteOfficer, editOfficer, getSingleOfficer, getSingleScheme, addSchemeMonitoring, getSingleSchemeMonitoring, getSingleDistrictScheme } = require('../controllers/admin.controller');

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
router.delete('/delete-govt-scheme', governmentSchemesDelete);
router.post('/add-scheme-monitoring', addSchemeMonitoring);

// SCHEME MONITORING
router.get('/get-single-scheme-monitoring', getSingleSchemeMonitoring);
router.get('/get-single-district-scheme', getSingleDistrictScheme);

module.exports = router;