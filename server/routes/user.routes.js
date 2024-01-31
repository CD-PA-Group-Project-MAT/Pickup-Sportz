const Users = require('../controllers/user.controller');
const { authenticate, authenticateRefresh } = require('../config/jwt.config');

module.exports = app => {
  app.get("/api/users", authenticate, Users.getCurrentUser);
  app.get("/api/refresh", authenticateRefresh, Users.refreshToken);
  app.post("/api/register", Users.register);
  app.post("/api/login", Users.login);
  app.post("/api/logout", Users.logout); 
  app.patch("/api/users/:id", authenticate, Users.updateUser);
}