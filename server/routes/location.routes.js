const LocationController = require("../controllers/location.controller");
const { authenticate } = require('../config/jwt.config');

// TODO add back 'authenticate' middleware when JWT is working

module.exports = app => {
    app.get("/api/locations", LocationController.getAllLocations);
    app.get('/api/locations/:id', LocationController.getLocationById);
    app.post('/api/locations', LocationController.createLocation);
    app.patch('/api/locations/:id', LocationController.updateLocation);
    app.delete('/api/locations/:id', LocationController.deleteLocation);
}