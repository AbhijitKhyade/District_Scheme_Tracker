const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemeMonitoringSchema = new Schema({
    govt_scheme: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    parameters: [{
        name: {
            type: String,
            required: true
        },
        value: {
            type: [Schema.Types.Mixed],
            default: null
        }
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});


const SchemeMonitoring = mongoose.model('SchemeMonitoring', SchemeMonitoringSchema);

module.exports = SchemeMonitoring;
