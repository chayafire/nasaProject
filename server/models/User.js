const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        minlength: 6
    },

    Images: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Image' }
    ],

})

module.exports = mongoose.model('User', userSchema);