const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageContent: {type: String,
        required: [true, "Message content is required"],
        minlength: [5, "Insufficient message length"]
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"
    }, 
}, {timestamps: true})

module.exports = mongoose.model('Message', messageSchema)