const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
     type: String,
     unique: 1,  
     require: true,   
     trim: true    
    },

    password: {
     type: String,
     require: true,
     trim: true,
    },

    firstName: {
        type: String,
        require: true,
        trim: true,
    },

    lastName: {
        type: String,
        require: true,
        trim: true,
    }
})

const User = mongoose.model('user', userSchema)

module.exports = {User}