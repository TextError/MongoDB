const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Profile models
const Profile = require('../../../models/Profile_Scheema');

//Load User model
const User = require('../../../models/User_Scheema');

//@route   Delete  api/profile/profile
//desc     Delete user and profile
//@access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req,res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => {
          res.json({ success: true });
        });
    })
    .catch(err => res.json(err));
});


module.exports = router;