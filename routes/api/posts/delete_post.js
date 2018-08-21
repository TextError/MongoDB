const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Post Model
const Post = require('../../../models/Post_Scheema');
//Load Profile models
const Profile = require('../../../models/Profile_Scheema');

//@route   Delete api/posts/:id
//desc     Delete post
//@access  Private
router.delete('/:id',passport.authenticate('jwt', { session: false }), (req,res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById( req.params.id )
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notouthorized: 'User not authorized' });
          }
          //Delete
          Post.remove()
            .then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
    })
});

module.exports = router;