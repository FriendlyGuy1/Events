const Event = require('../models/Event') 
const asyncHandler = require('express-async-handler'); 

// @desc Get Events
// @route GET /api/events
// @access PUBLIC

const getEvents = asyncHandler( async (req, res) => { 
    const events = await Event.find({ }); 
    res.status(200).json(events); 
}); 



// @desc Set Events
// @route POST /api/events
// @access PUBLIC

const setEvents = asyncHandler( async (req, res) => {

    if(!req.body.name){
        res.status(400) 
        throw new Error("Please add a name"); 
    }
    if(!req.body.description){
        res.status(400) 
        throw new Error("Please add a text field"); 
    }
    if(!req.body.img){
        res.status(400) 
        throw new Error("Please add an image"); 
    }  
    if(!req.body.price){
        res.status(400) 
        throw new Error("Please add a price"); 
    }
    if(!req.body.starting_date || !req.body.ending_date){
        res.status(400) 
        throw new Error("Please add a date"); 
    }   

    const event = await Event.create ({ 
        name: req.body.name, 
        description: req.body.description,
        starting_date: req.body.starting_date,
        ending_date: req.body.ending_date, 
        img: req.body.img,
        price: req.body.price,
    })
    res.status(200).json(event); 
})



module.exports = { 
    setEvents,
    getEvents
}
