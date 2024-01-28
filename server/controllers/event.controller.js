const Event = require("../models/event.model");
const User = require("../models/user.model")

module.exports = {
  getAllEvents: (req, res) => {
    Event.find({})
      .populate("players")
      .populate("location")
      .populate("creator")
      .then((allEvents) => res.json(allEvents))
      .catch((err) => res.status(400).json(err));
  },

  getEventById: (req, res) => {
    Event.findOne({ _id: req.params.id })
      .populate("players")
      .populate("location")
      .populate("creator")
      .then((oneEvent) => res.json(oneEvent))
      .catch((err) => res.status(400).json(err));
  },

  createEvent: (req, res) => {
    Event.create(req.body)
      .then((newEvent) => res.json(newEvent))
      .catch((err) => res.status(400).json(err));
  },

  updateEvent: (req, res) => {
    Event.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true, runValidators: true,
    })

      .then((updatedEvent) => res.json(updatedEvent))
      .catch((err) => res.status(400).json(err));
  },

  deleteEvent: (req, res) => {
    Event.findOneAndDelete({ _id: req.params.id })
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  },

  joinEvent: async (req, res) => {
    try {
      const eventId = req.params.eventId
      const userId = req.params.userId
      const updatedEvent = await Event.findByIdAndUpdate(eventId,
        { $push: { players: userId}},
        { new: true, useFindAndModify: false});
        const updatedUser = await User.findByIdAndUpdate(userId,
        { $push: { events: eventId}},
        { new: true, useFindAndModify: false});
        res.json(updatedEvent);
      } catch (err) {
      res.status(400).json(err)
    }
  },

  dropEvent: async (req, res) => {
    try {
      const eventId = req.params.eventId
      const userId = req.params.userId
      const updatedEvent = await Event.findByIdAndUpdate(eventId,
        { $pull: { players: userId}},
        { new: true, useFindAndModify: false});
      const updatedUser = await User.findByIdAndUpdate(userId,
        { $pull: { events: eventId}},
        { new: true, useFindAndModify: false});
        res.json(updatedEvent);
    } catch (err) {
      res.status(400).json(err)
    }
  },
};