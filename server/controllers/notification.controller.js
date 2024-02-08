const Notification = require("../models/notification.model");

module.exports = {
  getAllNotifications: (req, res) => {
    Notification.find({})
      .then((allNotifications) => res.json(allNotifications))
      .catch((err) => res.status(400).json(err));
  },

  getNotificationById: (req, res) => {
    Notification.findOne({ _id: req.params.id })
      .then((oneNotification) => res.json(oneNotification))
      .catch((err) => res.status(400).json(err));
  },

  getNotificationsByUserId: (req, res) => {
    // console.log("attempting getNotificationsByUserId with ID = "+ req.params.userId)
    Notification.find({ user: req.params.userId })
      .then((usersNotifications) => {
        // console.log("attemp is successful. userNotifications = ")
        // console.log(usersNotifications)
        res.json(usersNotifications)
      })
      .catch((err) => res.status(400).json(err));
  },

  createNotification: (req, res) => {
    Notification.create(req.body)
      .then((newNotification) => res.json(newNotification))
      .catch((err) => res.status(400).json(err));
  },

  updateNotification: (req, res) => {
    Notification.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedNotification) => res.json(updatedNotification))
      .catch((err) => res.status(400).json(err));
  },

  deleteNotification: (req, res) => {
    Notification.findOneAndDelete({ _id: req.params.id })
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  },
};
