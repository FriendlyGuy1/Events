import React, { useState, useRef, useEffect } from "react";

import { Calendar } from "react-date-range";
import format from "date-fns/format";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { Form, Button } from "react-bootstrap";
import eventsService from "../services/EventsService";

const NewEventForm = ({getData}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [ending_date, setEnding_date] = useState("");
  const [starting_date, setStarting_date] = useState("");


  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);
  const refTwo = useRef(null);

  useEffect(() => {
    // set current date on load
    setStarting_date(format(new Date(), "MM/dd/yyyy"));
    setEnding_date(format(new Date(), "MM/dd/yyyy"));
    
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);


  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setStartOpen(false);
    }
    if (refTwo.current && !refTwo.current.contains(e.target)) {
      setEndOpen(false);
    }
  }



  // on date change, store date in state
  const handleStartSelect = (date) => {
    setStarting_date(format(date, "MM/dd/yyyy"));
    setStartOpen(false);
  };

  const handleEndSelect = (date) => {
    setEnding_date(format(date, "MM/dd/yyyy"));
    setEndOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      alert("please fill in the name");
      return;
    }
    if (description === "") {
        alert("please enter some description");
        return;
    }
    if (image === "") {
        alert("please enter an image link");
        return;
    }
    if (price === "") {
        alert("please type a price");
        return;
      }

    const newEvent = {
      name: name,
      img: image,
      starting_date: starting_date,
      ending_date: ending_date,
      description: description,
      price: price,
    };

    eventsService.postEvents(newEvent);

    setName("");
    setImage("");
    setDescription("");
    setPrice("");
    getData();
  };

  return (
    <div className="InputForm">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Description </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a descrption"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 startDate">
          <Form.Label> start Date </Form.Label>
          
          <Form.Control
            value={starting_date}
            readOnly
            className="inputBox"
            onClick={() => setStartOpen((open) => !open)}
          />
          <div ref={refOne}>
            {startOpen && (
              <Calendar
                date={new Date()}
                onChange={handleStartSelect}
                className="calendarElement"
              />
            )}
          </div>
        
        </Form.Group>
      
        <Form.Group className="mb-3 endDate">
          <Form.Label> end Date </Form.Label>
          <Form.Control
            value={ending_date}
            readOnly
            className="inputBox"
            onClick={() => setEndOpen((open) => !open)}
          />
          <div ref={refTwo}>
            {endOpen && (
              <Calendar
                date={new Date()}
                onChange={handleEndSelect}
                className="calendarElement"
              />
            )}
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Image </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter an image link"
            id="image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Price </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            id="price"
            name="amount"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Add Event
        </Button>
      </Form>
    </div>
  );
};

export default NewEventForm;
