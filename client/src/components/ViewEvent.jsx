import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import MessageDisplay from "./MessageDisplay";
import MessageForm from "./MessageForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ViewEvent = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [event, setEvent] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    // Get event from DB and setEvent in state
    axiosPrivate
      .get(`/api/events/${id}`, { withCredentials: true })
      .then((res) => {
        // console.log("event");
        // console.log(res.data);
        setEvent({ ...res.data });
      })
      .catch((err) => console.error(err));

    // get messages for this event and set in state
    axiosPrivate
      .get(`/api/messages/${id}`, {
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
    <div className="">
      {/* nav */}
      <div>
        <Navbar />
      </div>
      {/* everything wrapper - gonna flex info and messages so they are side by side */}
      <div className="flex flex-row flex-wrap justify-evenly mt-5 mb-10">
        {/* wrapper for card */}
        <div className=" text-white border border-gray-700 bg-gray-700 rounded-lg w-80 p-5">
          {/* title */}
          <div>
            <h2>{event.eventTitle}</h2>
            <h2>{event.eventDate}</h2>
            <h2>{event.location?.locationName}{" "}</h2>
            <hr className="w-48 h-1 mx-auto my-4 bg-gray-400 border-0 rounded md:my-10"/>
          </div>
          {/* details */}
          <div>
            <p>{event.eventDetails}</p>
            </div>
        </div>
        </div>
        <div className="flex justify-center">
          <div className=" text-white border w-1/2 h-96 border-gray-700 rounded-lg p-5 flex flex-col bg-gray-700">
              <div className="overflow-auto h-72">
                <MessageDisplay messages={messages} setMessages={setMessages} />
              </div>
              <div>
                <MessageForm  id={id} messages={messages} setMessages={setMessages} />
              </div>
              
          </div>
        </div>
        {/* Messages div - keeping separate in case we want to scape api and use these in that window instead.*/}
    </div>
  );
};

export default ViewEvent;
