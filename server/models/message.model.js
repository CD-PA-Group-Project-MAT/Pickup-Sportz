const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageContent: {type: String,
        required: [true, "Message content is required"],
        minlength: [5, "Insufficient message length"]
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "Author is required for every message"]
    }, 
    event: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Event",
      required: [true, "Event is required for every message"]
  }, 
}, {timestamps: true})

module.exports = mongoose.model('Message', messageSchema)