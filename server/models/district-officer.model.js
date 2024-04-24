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
                    officer: [
                        {
                            officerName: {
                                type: String,
                                required: true
                            },
                            officerEmail: {
                                type: String,
                                required: true
                            }
                        }
                    ],
                    mapUrl: {
                        type: String,
                    }
                }
            ]
        }
    ]
});

const DistrictOfficer = mongoose.model('DistrictOfficer', districtOfficerSchema);

module.exports = DistrictOfficer;