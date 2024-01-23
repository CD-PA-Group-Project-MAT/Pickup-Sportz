const Message = require("../models/message.model");

module.exports = {
  getAllMessages: (req, res) => {
    Message.find({})
      .then((allMessages) => res.json(allMessages))
      .catch((err) => res.status(400).json(err));
  },

  getMessageById : (req,res) => {
      Message.findOne( {_id: req.params.id})
      .then(oneMessage => res.json(oneMessage))
      .catch(err => res.status(400).json(err))
  },
  
  createMessage : (req,res) => {
        Message.create(req.body)
        .then(newMessage=> res.json(newMessage))
        .catch(err => res.status(400).json(err))
    },

    updateMessage : (req,res) => {
        Message.findOneAndUpdate ({_id : req.params.id}, req.body, {new:true, runValidators:true})
        .then(updatedMessage => res.json(updatedMessage))
        .catch(err => res.status(400).json(err))
    },
    
    deleteMessage : (req,res) => {
        Message.findOneAndDelete ({_id : req.params.id} )
        .then(result => res.json(result))
        .catch(err => console.log(err))
  }
}