//auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator'); // import express-validator
const bcrypt = require('bcryptjs'); // import bcryptjs
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'scbkjsdb%#&$#&vhacboy';


// ROUTE 1:
// create a user using : POST "/api/auth/createuser". Doesn't require authentication (no login required)

// router.get('/',(req,res)=>{
router.post("/createuser",[
  // writting all the validation in this array -> from 'express-validator'
  body('name', 'Enter a valid name').isLength({min: 5}),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password').isLength({min: 3}),
], async (req, res) => {
  console.log(req.body);
  let success = false;
  // res.send("hello");
  // if there are errors return bad request and the errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    success = false;
    return res.status(400).json({success, errors: errors.array()});
  }
  // const user = User(req.body);
  // user.save(); // saves the data in the database

  try{
    // this is to create new user in the database
    // check whether the user with this email already exists
    let user = await User.findOne({email: req.body.email});
    console.log(user);
    if(user){
      success = false;
      return res.status(400).json({success, error: "User already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    
    // .then(user => res.json(user)).catch(err => {
    //   console.log(err);
    //   res.json({
    //     error: 'please Enter Unique email address',
    //     message: err.message
    //   });
    // });
    // user.save();
    // res.send(req.body);


    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    const data = {
      user:{
        id: user.id,
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    // res.json(user);
    success = true;
    res.json({success, authToken});

  }catch(err){
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2:
// -----------
// Authinticate a user using : POST "/api/auth/login". Doesn't require authentication (no login required)
router.post("/login",[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter cant be blank').exists(),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {email, password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      success = false;
      return res.status(400).json({success, error: "Please try to login with correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success = false;
      return res.status(400).json({success, error: "Please try to login with correct credentials"});
    }

    const payload = {
      user:{
        id: user.id,
      }
    }
    success = true;
    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({success, authToken});

  }catch(err){
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: get loggedin user details using: post POST "/api/auth/getuser". Login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
})



module.exports = router;
