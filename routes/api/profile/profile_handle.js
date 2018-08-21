const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Profile models
const Profile = require('../../../models/Profile_Scheema');
//Load User Profile
const User = require('../../../models/User_Scheema');


//@route   Get api/profile/handle/:handle
//desc     Get profile by handle
//@access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


module.exports = router;