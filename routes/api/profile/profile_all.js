const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Profile models
const Profile = require('../../../models/Profile_Scheema');
//Load User Profile
const User = require('../../../models/User_Scheema');


//@route   Get api/profile/all
//desc     Get all profiles
//@access  Public
router.get('/all', (req, res) => {
  const errors = {}
  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if (!profiles) {
      errors.noprofiles = 'There are no profiles'
      return res.status(404).json(errors);
    }
    res.json(profiles)
  })
  .catch(err => res.status(404).json({ profiles: 'There are no profiles' }));
});

module.exports = router;