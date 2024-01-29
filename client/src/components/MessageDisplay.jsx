
function MessageDisplay(props) {
  const { messages, setMessages } = props;

  return (
    <div>
       Display messages here
      {messages.map(message => <p key={message._id}>{message.messageContent}</p>)}
    </div>
  )
}

export default MessageDisplay