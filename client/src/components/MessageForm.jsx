import axios from 'axios';
import { useState } from 'react';


function MessageForm(props) {
  const {id} = props;
  const userId = sessionStorage.getItem("userId") // User's first name retrieved from SessionStorage. It is placed there at registration or login

  const [ message, setMessage ] = useState({
    messageContent : "",
    author : userId,
    event : id
  })

  function handleSubmit(e) {
    e.preventDefault();
    console.log("add new message")
    axios.post("http://localhost:8000/api/messages", message, {withCredentials:true})
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Add message</label>
        <input type="text" name="messageContent" value={message.messageContent} onChange={(e) => setMessage({...message, [e.target.name] : e.target.value})}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default MessageForm