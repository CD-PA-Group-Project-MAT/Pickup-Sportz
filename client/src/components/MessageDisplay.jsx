

function MessageDisplay(props) {
  const { messages } = props;

  return (
    <div>
      <h2 className="text-4xl">Chat:</h2>
      <div>
        <div>
        {messages.map(message => <p className="mt-1" key={message._id}>{message.author.firstName}: {message.messageContent}</p>)}
        </div>
      </div>
    </div>
  )
}

export default MessageDisplay