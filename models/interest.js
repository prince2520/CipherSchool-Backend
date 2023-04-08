const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InterestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    highest_education: {
        type: String,
        required: true,
        default: 'None'
    },
    currently_doing: {
        type: String,
        required: true,
        default: 'None'
    }
},{timestamps:true})


module.exports = mongoose.model('Interest', InterestSchema)