import axios from 'axios';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';


function MessageForm(props) {
  const {id, messages, setMessages} = props;
  const { auth } = useAuth();
  const [errors, setErrors] = useState([]);
  const [ message, setMessage ] = useState({
    messageContent : "",
    author : auth.user._id,
    event : id
  })

  function handleSubmit(e) {
    e.preventDefault();
    console.log("add new message")
    axios.post("http://localhost:8000/api/messages", message, {withCredentials:true})
    .then(res => {
      let tempMessage = res.data;
      tempMessage.author = auth.user
      setMessages([...messages, {...res.data, author : auth.user}])
      setMessage({...message, messageContent : ""})
    })
    .catch(err => setErrors(err.response.data.errors))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Add message</label>
        <input type="text" name="messageContent" value={message.messageContent} onChange={(e) => setMessage({...message, [e.target.name] : e.target.value})}/>
        {errors.messageContent ? <p>{errors.messageContent.message}</p> : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default MessageForm