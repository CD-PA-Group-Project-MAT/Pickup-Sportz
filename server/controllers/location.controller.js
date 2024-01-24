const Location = require("../models/location.model");

module.exports = {
  getAllLocations: (req, res) => {
    Location.find({})
      .then((allLocations) => res.json(allLocations))
      .catch((err) => res.status(400).json(err));
  },

  getLocationById: (req, res) => {
    Location.findOne({ _id: req.params.id })
      .then((oneLocation) => res.json(oneLocation))
      .catch((err) => res.status(400).json(err));
  },

  createLocation: (req, res) => {
    Location.create(req.body)
      .then((newLocation) => res.json(newLocation))
      .catch((err) => res.status(400).json(err));
  },

  updateLocation: (req, res) => {
    Location.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedLocation) => res.json(updatedLocation))
      .catch((err) => res.status(400).json(err));
  },

  deleteLocation: (req, res) => {
    Location.findOneAndDelete({ _id: req.params.id })
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  },
};
