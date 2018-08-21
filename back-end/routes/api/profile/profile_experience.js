const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Validation
const validateExperienceInput = require('../../../validation/experience');

//Load Profile models
const Profile = require('../../../models/Profile_Scheema');

//@route   Post api/profile/experience
//desc     Add experience to profile
//@access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateExperienceInput(req.body);
  //Check Validation
  if (!isValid) {
    //Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Add to experience array
      profile.experience.unshift(newExp);
      profile.save()
        .then(profile => res.json(profile));
    })
});

module.exports = router;