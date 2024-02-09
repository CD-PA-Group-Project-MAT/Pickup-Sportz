const MessageController = require("../controllers/message.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get("/api/messages", authenticate, MessageController.getAllMessages);
    app.get("/api/messages/events/:eventId", authenticate, MessageController.getEventMessages);
    app.get('/api/messages/:id', authenticate, MessageController.getMessageById);
    app.post('/api/messages', authenticate, MessageController.createMessage);
    app.patch('/api/messages/:id', authenticate, MessageController.updateMessage);
    app.delete('/api/messages/:id', authenticate, MessageController.deleteMessage);
}