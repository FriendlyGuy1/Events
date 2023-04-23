const mongoose = require('mongoose');

const Event = mongoose.model('Event', new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    }, 
    description: { 
        type: String, 
        required: true
    }, 
    img: { 
        type: String, 
        required: true
    }, 
    starting_date: {
        type: String,
        required: true
    },
    ending_date: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createAt: { 
        type: Date, 
        default: Date.now
    }, 
}))

module.exports = Event; 