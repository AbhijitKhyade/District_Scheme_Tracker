const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemeMonitoringSchema = new Schema({
    govt_scheme: {
        type: String,
        required: true
    },
    state: {
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
    },
    percentageProgress: {
        type: Number,
        default: 0
    }
});


// Calculate percentage progress before saving
SchemeMonitoringSchema.pre('save', function (next) {
    const totalParameters = this.parameters.length;
    const totalValues = this.parameters.reduce((acc, param) => acc + Math.min(param.value.length, 12), 0);
    const totalValuesExpected = totalParameters * 12;
    this.percentageProgress = ((totalValues / totalValuesExpected) * 100).toFixed(2);
    next();
});


const SchemeMonitoring = mongoose.model('SchemeMonitoring', SchemeMonitoringSchema);

module.exports = SchemeMonitoring;
