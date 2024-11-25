const express = require('express');
const router = express.Router();
const User = require('../models/User');

// create a user using : POST "/api/auth/". Doesn't require authentication

// router.post('/',(req,res)=>{
router.get('/',(req,res)=>{
  obj = {
    a: 'tehhci',
    number: 93792397
  }
  res.json(obj);
  res.json([]);
  // console.log(req.body);
  // const user = User(req.body);
  // user.save()
  // res.send(req.body);
});

module.exports = router;
