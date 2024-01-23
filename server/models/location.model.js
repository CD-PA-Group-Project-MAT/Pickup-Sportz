const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: [ true, "Location name is required"]
},
  address: {
    type: String
},
  city: {
    type: String
},
  state: {
    type: String
},
locationDetails: {type: String
},
}, {timestamps: true})

module.exports = mongoose.model('Location', locationSchema)