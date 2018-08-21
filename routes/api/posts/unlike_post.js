const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Post Model
const Post = require('../../../models/Post_Scheema');
//Load Profile models
const Profile = require('../../../models/Profile_Scheema');

//@route   Post api/posts/unlike/:id
//desc     Unlike post
//@access  Private
router.post('/unlike/:id',passport.authenticate('jwt', { session: false }), (req,res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById( req.params.id )
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not yet liked this post' });
          }
          //Get remove index
          const removeindex = post.likes
            .map(item  => item.user.toString())
            .indexOf(req.user.id);
            //Splice out of array
            post.likes.splice(removeindex, 1);
          post.save()
            .then(post => res.json(post)); 
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
    })
});

module.exports = router;