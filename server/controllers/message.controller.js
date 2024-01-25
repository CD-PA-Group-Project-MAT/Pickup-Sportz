const Message = require("../models/message.model");

module.exports = {

  getAllMessages: (req, res) => {           // get all
    Message.find({})
      .populate("author")
      .then((allMessages) => res.json(allMessages))
      .catch((err) => res.status(400).json(err));
  },

  getEventMessages: (req, res) => {        // event ref coming through route
    Message.find({ event: req.params.eventId })
      .populate("author")
      .then((eventMessages) => res.json(eventMessages))
      .catch((err) => res.status(400).json(err));
  },

  getMessageById: (req, res) => {           // message _id coming through route
    Message.findOne({ _id: req.params.id })
      .populate("author")
      .then((oneMessage) => res.json(oneMessage))
      .catch((err) => res.status(400).json(err));
  },

  createMessage: (req, res) => {           // author coming through token as userId
    let newMessageBody = req.body;          // we will change the the key to "author"
    newMessageBody.author = req.body.userId;
    Message.create(newMessageBody)
      .then((newMessage) => res.json(newMessage))
      .catch((err) => res.status(400).json(err));
  },

  updateMessage: (req, res) => {           // message _id coming through route
    Message.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedMessage) => res.json(updatedMessage))
      .catch((err) => res.status(400).json(err));
  },

  deleteMessage: (req, res) => {           // message _id coming through route
    Message.findOneAndDelete({ _id: req.params.id })
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  },
};
