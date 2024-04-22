const mongoose = require('mongoose');

const districtOfficerSchema = new mongoose.Schema({
    states: [
        {
            stateName: {
                type: String,
                required: true
            },
            districts: [
                {
                    districtName: {
                        type: String,
                        required: true
                    },
                    officer: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
});

const DistrictOfficer = mongoose.model('DistrictOfficer', districtOfficerSchema);

module.exports = DistrictOfficer;