
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


function MessageForm(props) {
  const {id, messages, setMessages} = props;
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [errors, setErrors] = useState([]);
  const [ message, setMessage ] = useState({
    messageContent : "",
    author : auth.user._id,
    event : id
  })

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("add new message")
    axiosPrivate.post("/api/messages", message, {withCredentials:true})
    .then(res => {
      let tempMessage = res.data; // TODO double-check but I think I can remove the next 2 lines
      tempMessage.author = auth.user
      setMessages([...messages, {...res.data, author : auth.user}])
      setMessage({...message, messageContent : ""})
    })
    .catch(err => setErrors(err.response.data.errors))
  }

  return (
    <div className=''>
      <div className=''>
        <form className="flex flex-row mt-4 justify-between"onSubmit={handleSubmit}>
          
          <input className="text-white bg-gray-500 w-10/12 rounded-lg h-10"type="text" name="messageContent" placeholder='type your message here' value={message.messageContent} onChange={(e) => setMessage({...message, [e.target.name] : e.target.value})}/>
          
          <button className='border border-gray-500 rounded-lg w-36' type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default MessageForm