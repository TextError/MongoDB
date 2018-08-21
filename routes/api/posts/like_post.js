const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Post Model
const Post = require('../../../models/Post_Scheema');
//Load Profile models
const Profile = require('../../../models/Profile_Scheema');

//@route   Post api/posts/like/:id
//desc     Like post
//@access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'You already liked the post' });
          }
          //Add user to the likes array
          post.likes.unshift({ user: req.user.id });
          post.save()
            .then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
});

module.exports = router;