const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        az: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        }
    },
    description: {
        az: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;