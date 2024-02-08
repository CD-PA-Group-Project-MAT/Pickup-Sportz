const Message = require("../models/message.model");
const Event = require("../models/event.model");
const Notification = require("../models/notification.model");

module.exports = {

  getAllMessages: (req, res) => {                                   // get all messages
    Message.find({})
      .populate("author")
      .then((allMessages) => res.json(allMessages))
      .catch((err) => res.status(400).json(err));
  },

  getEventMessages: (req, res) => {                                 // Get messages for a given event (eventId ref coming through route)
    Message.find({ event: req.params.eventId })
      .populate("author")
      .then((eventMessages) => res.json(eventMessages))
      .catch((err) => res.status(400).json(err));
  },

  getMessageById: (req, res) => {                                   // Get message by message ID (_id coming through route)
    Message.findOne({ _id: req.params.id })
      .populate("author")
      .then((oneMessage) => res.json(oneMessage))
      .catch((err) => res.status(400).json(err));
  },

  createMessage: async (req, res) => {                              // Create message. Additionally, we find the associated event and then create notifications for all players.
    try {
      const newMessage = await Message.create(req.body);            // Create message in DB
      const targetEvent = await Event.findById(req.body.event);     // Retrieve associated Event from DB
      for (let i = 0 ; i < targetEvent.players.length; i++){        // Loop through all 'players' in associated Event
        if (targetEvent.players[i] != req.body.author){             // If the player is not the User who just authored the message, then...
          const notification = {
            user : targetEvent.players[i],
            event : req.body.event,
            message : newMessage._id 
          }
          await Notification.create(notification);                  // ...Create a notification for that player regarding this event & message
        }
      }
      res.json(newMessage)
    } catch (err){
      console.log("error while attempt to create message in DB")
      res.status(400).json(err)
    }
  },

  updateMessage: (req, res) => {                                    // Update message. (message _id coming through route)
    Message.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedMessage) => res.json(updatedMessage))
      .catch((err) => res.status(400).json(err));
  },

  deleteMessage: (req, res) => {                                    // Delete message. Additionally, we will want to delete any associated notifications.
    Message.findOneAndDelete({ _id: req.params.id })
      .then((result) => res.json(result))// TODO delete notifications associated with the deleted message
      .catch((err) => console.log(err));
  },
};
