const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_num: {
        type: Number,
        required: false
    },
    profileImgUrl: {
        type: String,
        required: false
    },

    about_me: {
        type: String,
        required: false
    },
    socials: {
        type: Schema.Types.ObjectId,
        ref: 'Social',
        required: false
    },
    professionalInfo: {
        type: Schema.Types.ObjectId,
        ref: 'ProfessionalInfo',
        required: false
    },
    interests: [{
        type: Schema.Types.ObjectId,
        ref: 'Interest',
        required: false
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }]
})


module.exports = mongoose.model('User', userSchema)