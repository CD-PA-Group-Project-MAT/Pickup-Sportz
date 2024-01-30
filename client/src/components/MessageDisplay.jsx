function MessageDisplay(props) {
  const { messages, setMessages } = props;

  return (
    <div>
       <p>Messages:</p>
      {messages.map(message => <p key={message._id}>{message.author.firstName}: {message.messageContent}</p>)}
    </div>
  )
}

export default MessageDisplay