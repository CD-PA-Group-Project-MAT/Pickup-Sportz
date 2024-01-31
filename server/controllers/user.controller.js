require('dotenv').config()

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// TODO const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET // For production/deployment
// TODO const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET // For production/deployment
const REFRESH_TOKEN_SECRET = "secret_key" // For development
const ACCESS_TOKEN_SECRET = "secret_key" // For development

function generateAccessToken(user) {
  const accessToken = jwt.sign({ _id : user._id, email : user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });  // User token expires in 5 minutes
  return accessToken;
}
function generateRefreshToken(user) {
  const refreshToken = jwt.sign({ _id : user._id, email : user.email }, REFRESH_TOKEN_SECRET, {expiresIn: '7d'});  // Refresh token expires in 7 days
  return refreshToken;
}

module.exports = {
  refreshToken : async (req,res) => {
    // console.log("getting to refreshToken")
    try {
      const currentUser = {_id : req.body.userId, email: ""}; // TODO MAYBE get rid of email in token payload ?????
      // const currentUser = await User.findOne({_id : req.body.userId});
      // console.log("currentUser ");
      // console.log(currentUser);
      const accessToken = await generateAccessToken(currentUser);
      console.log("Refreshing Access Token")
      res
        .status(201)
        .cookie("accessToken", accessToken, { httpOnly: true, maxAge : 1*60*60*1000}) // Cookie maxAge = 1 hour from now
        .json({msg: "Refreshed accessToken!", user : currentUser, accessToken : accessToken })
    } catch(err) {
      res.status(400).json(err)
    }
  },

  register : async (req,res) => {
    try {
      const possibleUser = await User.findOne({ email : req.body.email })
      if (possibleUser) {
        res.status(400).json({errors: { email : { message : 'This email already exists. Please log in.' }}})
      } else {
        const newUser = await User.create(req.body)
        // *The first value passed into jwt.sign is the 'payload'. This can be retrieved in jwt.verify
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);  
        res
          .status(201)
          .cookie("accessToken", accessToken, { httpOnly: true, maxAge : 1*60*60*1000}) 
          .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge : 12*60*60*1000}) 
          .json({msg: "success!", user : newUser, accessToken : accessToken})
      }
    }
    catch(err) {
      res.status(400).json(err)
    }
  },

  login: async(req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });     // Search for the given email
      if (user === null) {                                            // Email NOT found in 'users' collection
        // console.log("email not found in collection")
        res.status(400).json({message:"Invalid Credentials"});
      } else {
        const isCorrectPW = await bcrypt.compare(req.body.password, user.password); // compare PW given with PW hash in DB
        // console.log("completed bcrypt.compare")
        if(isCorrectPW) {                                             // Password was a match!
          // console.log("password is correct")
          // *The first value passed into jwt.sign is the 'payload'. This can be retrieved in jwt.verify
          // TODO extended the expiration times for development...
          // const accessToken = jwt.sign({_id: user._id, email:user.email}, ACCESS_TOKEN_SECRET, {expiresIn:'12h'});  // PW is a match! Define accessToken
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);  
          res
            .status(201)
            .cookie('accessToken', accessToken, {httpOnly:true, maxAge: 1*60*60*1000})
            .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge : 12*60*60*1000})
            .json({msg: "success!", user : user, accessToken : accessToken})
        } else {                                                      // Password was NOT a match
          res.status(400).json({message:"Invalid Credentials"});
        }
      }
    }
    catch(err){
      res.status(400).json(err);
    }
  },
    
  logout: (req, res) => {
    res.clearCookie('accessToken');
    res.sendStatus(200);                                              // Apparently, this is the equivalent of res.status(200).send('OK')
  },
  
  getCurrentUser: async (req, res) => {
    try{
      const currentUser = await User
        .find({_id : req.body.userId})                         // req.body.userId will come through JWT token
        .populate({path: 'events', populate: { path: 'location', model: "Location"}}); 
      res.status(200).json(currentUser);
    } 
    catch (err){
      res.status(400).json(err);
    }
  },

  // TODO: this is untested(new) code. Test it out. 
  // We are using this primarily for checking last login date so 
  // that we can count the new messages since then
  updateUser: async (req, res) => {
    try{
      const updatedUser = await User.findOneAndUpdate ({_id : req.body.userId}, req.body, {new:true, runValidators:true}); // req.body.userId coming through JWT 
      res.status(200).json(updatedUser);
    } 
    catch (err){
      res.status(400).json(err);
    }
  }
}
