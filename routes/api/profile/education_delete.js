const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Profile models
const Profile = require('../../../models/Profile_Scheema');

//@route   Delete  api/profile/education/:edu_id
//desc     Delete experience from profile
//@access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req,res) => {
  Profile.findOne({ user: req.user.id})
    .then(profile => {
      //Get remove index
      const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);
      //Splice out of array
      profile.education.splice(removeIndex, 1);
      //Save
      profile.save()
        .then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});


module.exports = router;