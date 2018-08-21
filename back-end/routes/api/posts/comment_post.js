const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load Post Model
const Post = require('../../../models/Post_Scheema');
//Load Validation
const validatePostInput = require('../../../validation/post');


//@route   Post api/posts/comment/:id
//desc     Add comment to post
//@access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
  
  const { errors, isValid } = validatePostInput(req.body);
  //Check Validation
  if (!isValid) {
    //Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      //Add to comments array
      post.comments.unshift(newComment);
      post.save()
        .then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
});


module.exports = router;