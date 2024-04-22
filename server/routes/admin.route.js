const express = require('express');
const { officerNamesUpload, getAllOfficersNames, officerDistrict, officerDistrictData, officerDistrictDelete, officerDistrictEdit } = require('../controllers/admin.controller');

const router = express.Router();

//officers
router.post('/officers-uploads', officerNamesUpload);
router.get('/get-officers-names', getAllOfficersNames);
router.post('/officer-district-relation', officerDistrict);
router.get('/officer-district-data', officerDistrictData);
router.delete('/officer-district-delete', officerDistrictDelete);
router.put('/officer-district-edit', officerDistrictEdit);

module.exports = router;