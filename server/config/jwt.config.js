require("dotenv").config();

const jwt = require("jsonwebtoken");
// TODO const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET // For production/deployment
// TODO const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET // For production/deployment
const REFRESH_TOKEN_SECRET = "secret_key"; // For development
const ACCESS_TOKEN_SECRET = "secret_key"; // For development

/* This file is our 'middleware' 
  Every time our express server uses get, post, patch, etc.,
  we include the below function to *authenticate* the token that is
  in the cookie as part of the request coming from the front end.
  If authentication is successful, this function finishes with 'next()'
  which executes the .then() immediately following sending the request
  to the server
  */
module.exports.authenticate = (req, res, next) => {

  jwt.verify(req.cookies.userToken, ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log("Authenticate failed within jwt.config.js");
      res.status(403).json({ verified: false });
    } else {
      // * This is where we retrieve the 'payload' from the token !!
      // And we can add any item that is in the payload to the request body
      // so that it will become part of the request to the DB
      req.body.userId = payload._id;
      next();
    }
  });
};
