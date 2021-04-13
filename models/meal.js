const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mealSchema = new Schema({
    title: {
     type: String,
     require: true,   
     trim: true    
    },

    description: {
     type: String,
     require: true,
     trim: true,
    },

    price: {
        type: Number,
        require: true,
    },

    included: {
        type: [String],
        reqire: true,
    },

    category: {
        type: String,
        require: true,
        trim: true,
    },

    cooking_time: {
        type: Number,
        require: true
    },

    serving: {
        type: Number, 
        require: true,
    },

    calories: {
        type: Number,
        require: true,
    },

    country_style: {
        type: String, 
        require: true, 
        trim: true
    },

    topmeal: {
        type: Boolean,
        require: true,
    },

    image: {
        type: String,
        require: true,
    },

    createAt: {
        type: Date,
        default: Date.now
    }
})

const Meal = mongoose.model('meal', mealSchema)

module.exports = {Meal}