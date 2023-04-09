const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InterestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    interest:{
        type: String,
        required: false
    }
},{timestamps:true})


module.exports = mongoose.model('Interest', InterestSchema)