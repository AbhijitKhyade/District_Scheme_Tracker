const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    govt_scheme: {
        type: String,
        required: true,
    },
    objective: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    parameters: {
        type: String,
        required: true,
    }
});

const Schemes = mongoose.model('Schemes', schemeSchema);

module.exports = Schemes;
