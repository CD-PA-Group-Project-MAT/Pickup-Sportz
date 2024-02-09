const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: [ true, "Event title is required"]
    },
    eventDate: {
        type: Date,
        required: [ true, "Event date is required"]
    },
    eventDetails: {type: String
    },
    maxPlayers: {type: Number,
        required: [true, "Participant count is required"],
        min: [2, "Event must accommodate at least 2 participants"]
    },
    location: {
      type: mongoose.Schema.Types.ObjectId, ref: "Location",
      required: [ true, "Location is required"] 
    }, 
    creator: {
      type: mongoose.Schema.Types.ObjectId, ref: "User",
      required: [ true, "Creator is required"] 
    }, 
    players: [{type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],
}, {timestamps: true})

module.exports = mongoose.model('Event', eventSchema)