import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'
import axios from 'axios';
import MessageDisplay from './MessageDisplay';
import MessageForm from './MessageForm';

const ViewEvent = () => {
  const { id } = useParams();
  const [ event, setEvent ] = useState({});
  const [ messages, setMessages ] = useState([]);
  
  useEffect(() => {                                                 // Get event from DB and setTask in state
    axios.get(`http://localhost:8000/api/events/${id}`, { withCredentials : true })
    .then(res => {
      console.log("event")
      console.log(res.data)
      setEvent ( {...res.data} );
    })
    .catch(err => console.error(err));
    axios.get(`http://localhost:8000/api/messages/${id}`, {withCredentials:true})
    .then(res => {
      console.log("messages")
      console.log(res.data);
      setMessages(res.data)
    })
    .catch(err => console.error(err))
  },[]);


  return (
    <div>
      <Navbar/>
      {event.eventTitle} {event._id}
      <MessageDisplay messages={messages} setMessages={setMessages}/>
      <MessageForm id={id}/>
    </div>
  )
}

export default ViewEvent