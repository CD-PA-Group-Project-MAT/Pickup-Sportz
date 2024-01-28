const EventController = require("../controllers/event.controller");
const { authenticate } = require('../config/jwt.config');

// TODO add back 'authenticate' middleware when JWT is working

module.exports = app => {
    app.get("/api/events", authenticate, EventController.getAllEvents);
    app.get('/api/events/:id', authenticate, EventController.getEventById);
    app.post('/api/events', authenticate, EventController.createEvent);
    app.patch('/api/events/:id', authenticate, EventController.updateEvent);
    app.delete('/api/events/:id', authenticate, EventController.deleteEvent);
    app.patch('/api/events/join/:eventId/player/:userId', authenticate, EventController.joinEvent)
    app.patch('/api/events/drop/:eventId/player/:userId', authenticate, EventController.dropEvent)
}