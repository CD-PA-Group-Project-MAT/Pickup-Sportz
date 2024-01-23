const Event = require("../models/event.model");

module.exports = {
  getAllEvents: (req, res) => {
    Event.find({})
      .populate("players")
      .populate("location")
      .populate("creator")
      .populate({                             // Here we populate the nested ref 'author'
        path: "messages",                     // This may not be the ideal solution.
        populate: {                           // One commentator: "This is a costly operation and does not scale well"
          path: "author",
          model: "User",
        },
      })
      .then((allEvents) => res.json(allEvents))
      .catch((err) => res.status(400).json(err));
  },

  getEventById: (req, res) => {
    Event.findOne({ _id: req.params.id })
      .populate("players")
      .populate("location")
      .populate("creator")
      .populate({
        path: "messages",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .then((oneEvent) => res.json(oneEvent))
      .catch((err) => res.status(400).json(err));
  },

  createEvent: (req, res) => {
    Event.create(req.body)
      // possible add .populate()s ?
      .then((newEvent) => res.json(newEvent))
      .catch((err) => res.status(400).json(err));
  },

  updateEvent: (req, res) => {
    Event.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      // possible add .populate()s ?
      .then((updatedEvent) => res.json(updatedEvent))
      .catch((err) => res.status(400).json(err));
  },

  deleteEvent: (req, res) => {
    Event.findOneAndDelete({ _id: req.params.id })
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  },
};
