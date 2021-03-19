const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    copyright: {
        type: String,
        require
    },

    date: {
        type: String,
        require
    },
    explanation: {
        type: String,
        require
    },
    media_type: {
        type: String,
        require
    },
    service_version: {
        type: String,
        require
    },
    title: {
        type: String,
        require
    },
    url: {
        type: String,
        require
    },


    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }


})

module.exports = mongoose.model('Image', ImageSchema);