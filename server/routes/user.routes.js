const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.post("/api/register", Users.register);
  app.post("/api/login", Users.login);
  app.post("/api/logout", Users.logout); 
  app.patch("/api/users/:id", authenticate, Users.updateUser);
  app.post("/api/users", Users.createUser); // TODO remove this route once testing is complete
}