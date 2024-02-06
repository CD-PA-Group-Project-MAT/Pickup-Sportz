const LocationController = require("../controllers/location.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get("/api/locations", authenticate, LocationController.getAllLocations);
    app.get('/api/locations/:id', authenticate, LocationController.getLocationById);
    app.post('/api/locations', authenticate, LocationController.createLocation);
    app.patch('/api/locations/:id', authenticate, LocationController.updateLocation);
    app.delete('/api/locations/:id', authenticate, LocationController.deleteLocation);
}