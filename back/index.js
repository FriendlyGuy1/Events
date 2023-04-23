require('dotenv').config()

const connectDB = require('./config/db'); 
connectDB();

const express = require('express'); 
const app = express(); 
app.use(express.json());

const {
    setEvents,
    getEvents
} = require('./controllers/EventController')


app.post('/api/events', setEvents) 
app.get("/api/events", getEvents)



app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`) 
})
