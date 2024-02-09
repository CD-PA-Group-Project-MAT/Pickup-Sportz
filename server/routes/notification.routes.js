const NotificationController = require("../controllers/notification.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get("/api/notifications", authenticate, NotificationController.getAllNotifications);
    app.get('/api/notifications/user/:userId', authenticate, NotificationController.getNotificationsByUserId); // TODO add back authenticate .. will need to refactor code in Login.jsx
    app.get('/api/notifications/:id', authenticate, NotificationController.getNotificationById);
    app.post('/api/notifications', authenticate, NotificationController.createNotification);
    app.patch('/api/notifications/:id', authenticate, NotificationController.updateNotification);
    app.delete('/api/notifications/:id', authenticate, NotificationController.deleteNotification);
}