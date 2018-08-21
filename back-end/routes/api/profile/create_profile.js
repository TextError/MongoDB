const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load Validation
const validateProfileInput = require('../../../validation/profile');
//Load Profile models
const Profile = require('../../../models/Profile_Scheema');
//Load User Profile
const User = require('../../../models/User_Scheema');

//-------------------------------------------

//@route   POST  api/profile
//desc     Create user or edit profile
//@access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  //Check Validation
  if (!isValid) {
    //Return any errors with 400 status
    return res.status(400).json(errors);
  }

  //Get fields
  const profilefields = {};
  profilefields.user = req.user.id;
  if (req.body.handle) profilefields.handle = req.body.handle;
  if (req.body.company) profilefields.company = req.body.company;
  if (req.body.website) profilefields.website = req.body.website;
  if (req.body.location) profilefields.location = req.body.location;
  if (req.body.bio) profilefields.bio = req.body.bio;
  if (req.body.status) profilefields.status = req.body.status;
  if (req.body.githubusername) profilefields.githubusername = req.body.githubusername;

  //Skills - split into array
  if (typeof req.body.skills !== 'undefined') {
    profilefields.skills = req.body.skills.split(',');
  }

  //Social
  profilefields.social = {};
  if (req.body.youtube) profilefields.social.youtube = req.body.youtube;
  if (req.body.twitter) profilefields.social.twitter = req.body.twitter;
  if (req.body.facebook) profilefields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profilefields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profilefields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profilefields }, { new: true })
          .then(profile => res.json(profile));
      } else {
        //Create

        //Check if handle exists
        Profile.findOne({ handle: profilefields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = 'That handle allready exists';
              res.status(400).json(errors);
            }
            //Save profile
            new Profile(profilefields).save()
              .then(profile => res.json(profile));
          });
      }
    });
});

module.exports = router;