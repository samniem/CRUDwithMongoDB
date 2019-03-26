let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    },
    occupation:{
        type: String,
        required: false

    }


})

let Users = module.exports = mongoose.model('Users', userSchema)