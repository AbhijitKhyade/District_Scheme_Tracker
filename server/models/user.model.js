const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    role: {
        type: String,
        enum: ['Admin', 'District Officer', 'Citizen'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    district: {
        type: String,
    },
});

module.exports = mongoose.model('User', UserSchema);
