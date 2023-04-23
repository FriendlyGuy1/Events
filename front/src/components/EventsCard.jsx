import React, {useState, useEffect} from 'react'
import eventsService from '../services/EventsService';
import "./EventsCard.css"
import NewEventForm from './NewEventForm';

const EventsCard = () => {

    const [events, setEvents] = useState([]);

    const getData = () => {
        eventsService.getEvents().then((res) => {
          setEvents([...res.data]);
        });
    };
    
    useEffect(() => {
        getData();
    }, []);

  return (
    <div className='main'>
        <NewEventForm getData={getData}/>
        <div className='cards'>
        {events && events.map((event, index)=> {
            return (
                <div key={index} className='card'>
                    <img src={event.img} alt="" width={300} height={250}></img>
                    <h3 className='title'>{event.name}</h3>
                    <p>{event.description}</p>
                    <h5>{`${event.starting_date}-${event.ending_date}`}</h5>
                    <div className='price'>{event.price}$</div>

                </div>
            )
        })}
        </div>
    </div>

  )
}

export default EventsCard

