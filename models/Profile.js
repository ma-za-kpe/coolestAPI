const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    nickName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Proile', ProfileSchema, "profile");