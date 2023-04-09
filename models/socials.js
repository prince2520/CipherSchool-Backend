const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const socialSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    linkedIn:{
        type: String,
        required: false
    },
    github:{
        type: String,
        required: false
    },
    facebook:{
        type: String,
        required: false
    },
    twitter:{
        type: String,
        required: false
    },
    instagram:{
        type: String,
        required: false
    },
    website:{
        type: String,
        required: false
    }
},{timestamps:true})


module.exports = mongoose.model('Social', socialSchema)