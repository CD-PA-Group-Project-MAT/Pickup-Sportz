import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import MessageDisplay from "./MessageDisplay";
import MessageForm from "./MessageForm";

const ViewEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Get event from DB and setTask in state
    axios
      .get(`http://localhost:8000/api/events/${id}`, { withCredentials: true })
      .then((res) => {
        // console.log("event");
        // console.log(res.data);
        setEvent({ ...res.data });
      })
      .catch((err) => console.error(err));
    // get messages for this event and set in state
    axios
      .get(`http://localhost:8000/api/messages/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("messages");
        // console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  //   todo: need to finish styling. Have the div's in order just need to set up my text boxes. Tony, if you have any ideas on how to make this look better, please feel free to let me know. Not sure where we stand on bringing in that api just yet.

  return (
    <div>
      {/* nav */}
      <div>
        <Navbar />
      </div>
      {/* everything wrapper - gonna flex info and messages so they are side by side */}
      <div className="flex flex-row justify-evenly my-20">
        {/* wrapper for card */}
        <div className=" text-white border border-gray-700 w-80">
          {/* title */}
          <div>
            <h2>{event.eventTitle}</h2>
          </div>
          {/* date */}
          <div>{event.eventDate}</div>
          {/* location */}
          <div>
            {event.location?.locationName}{" "}
            {/*  Using 'optional chaining here' */}
          </div>
          {/* details */}
          <div>{event.eventDetails}</div>
        </div>

        {/* Messages div - keeping separate in case we want to scap api and use these in that window instead.*/}
        <div className=" text-white">
          <div>
            <MessageDisplay messages={messages} setMessages={setMessages} />
            <MessageForm id={id} messages={messages} setMessages={setMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
