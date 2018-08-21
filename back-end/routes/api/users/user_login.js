const express = require('express');
const router = express.Router();
const User = require('../../../models/User_Scheema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');

//Load Input Validation
const validateLoginInput = require('../../../validation/login');

//@route   Post api/users/login
//desc     Login user / returning JWT (Token)
//@access  Public
router.post('/login', (req, res) => {

  const {errors, isValid } = validateLoginInput(req.body);
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  
  //Find user by email
  User.findOne({ email: email }) // or just User.findOne({email})
    .then(user => {
      //Check for user
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors); // return res.status(404).json({ email: 'User not found' })
      }
      //Check password
      bcrypt.compare(password, user.password)
        .then(isMatchPassword => {
          if (isMatchPassword) {
            //res.json({msg: 'Succes'}) 
            //User match
            const payload = {  //Create jwt payload
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }

            //Sign Token
            jwt.sign(
              payload, 
              keys.secretOrKey, 
              { expiresIn: 7200 }, 
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
            });
          } else {
            errors.password = 'Password incorect'
            return res.status(400).json(errors); //return res.status(400).json({password: 'Password incorect'})
          }
        })
    })
});

module.exports = router;