const MessageController = require("../controllers/message.controller");
const { authenticate } = require('../config/jwt.config');
// TODO add back 'authenticate' middleware when JWT is working

module.exports = app => {
    app.get("/api/messages",  MessageController.getAllMessages);
    app.get('/api/messages/:id',  MessageController.getMessageById);
    app.post('/api/messages',  MessageController.createMessage);
    app.patch('/api/messages/:id',  MessageController.updateMessage);
    app.delete('/api/messages/:id',  MessageController.deleteMessage);
}