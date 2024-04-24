const express = require('express');
const { officerNamesUpload, getAllOfficersNames, officerDistrict, officerDistrictData, officerDistrictDelete, officerDistrictEdit, governmentSchemes, allGovernmentSchemes, governmentSchemesDelete, addOfficer, deleteOfficer, editOfficer, getSingleOfficer } = require('../controllers/admin.controller');

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
router.delete('/delete-govt-scheme', governmentSchemesDelete);

module.exports = router;