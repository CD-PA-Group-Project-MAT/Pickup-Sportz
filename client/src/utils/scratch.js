let messages = []
messages.push({ messageContent : "hello there", creatorID: 1, unNotifiedUsers : [1,2,3]})
messages.push({ messageContent : "howdy", creatorID: 2, unNotifiedUsers : [2,4]})
console.log(messages)
const response = messages.map((message) => message.unNotifiedUsers.includes(4));
console.log(response)
