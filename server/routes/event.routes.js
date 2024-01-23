const EventController = require("../controllers/event.controller");
const { authenticate } = require('../config/jwt.config');

// TODO add back 'authenticate' middleware when JWT is working

module.exports = app => {
    app.get("/api/events", EventController.getAllEvents);
    app.get('/api/events/:id', EventController.getEventById);
    app.post('/api/events', EventController.createEvent);
    app.patch('/api/events/:id', EventController.updateEvent);
    app.delete('/api/events/:id', EventController.deleteEvent);
}