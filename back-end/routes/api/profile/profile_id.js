const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Profile models
const Profile = require('../../../models/Profile_Scheema');
//Load User Profile
const User = require('../../../models/User_Scheema');


//@route   Get api/profile/user/:user_id
//desc     Get profile by ID
//@access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

module.exports = router;