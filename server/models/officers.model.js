const mongoose = require('mongoose');

const officerSchema = mongoose.Schema({
    officerName: {
        type: String,
        required: true
    },
    officerEmail: {
        type: String,
        required: true
    },
});

const Officer = mongoose.model('Officer', officerSchema);

module.exports = Officer;