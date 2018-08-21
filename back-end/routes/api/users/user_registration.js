const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

//Load Input Validation
const validateRegisterInput = require('../../../validation/register');

//Load user model
const User = require('../../../models/User_Scheema');

//@route   Get api/users/register
//desc     Register user
//@access  Public
router.post('/register', (req,res) => {
  
  const {errors, isValid } = validateRegisterInput(req.body);
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email allready exists!';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // size
          r: 'pg', // rating
          d: 'mm' // default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar, // or avatar: avatar
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    });
});

module.exports = router;
