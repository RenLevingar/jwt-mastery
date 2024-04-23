const mongoose = require('mongoose');

const personScheme = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Must provide a name'],
        trim: true,
        maxLength:[20, "The name can't exceed 20 characters"]
    },
    password:{
        type: String,
        required: [true],
        trim: true,
    },
    id:{
        type: Number,
        required: [true],
        trim: true,
    }
},{collection:'Users'})

module.exports = mongoose.model('Users', personScheme)