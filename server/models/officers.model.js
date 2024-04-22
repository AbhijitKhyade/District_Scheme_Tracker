const mongoose = require('mongoose');

const OfficerSchema = mongoose.Schema({
    names: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
        },
    ],
});

const Officer = mongoose.model('Officer', OfficerSchema);

module.exports = Officer;