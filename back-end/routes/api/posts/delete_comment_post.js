const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load Post Model
const Post = require('../../../models/Post_Scheema');


//@route   Delete api/posts/comment/:id/:comment_id
//desc     Remove comment from post
//@access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req,res) => {

  Post.findById(req.params.id)
    .then(post => {
      //Check if the comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotexists: 'Comment does not exists' });
      }
      //Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);
      //Splice from array
      post.comments.splice(removeIndex, 1);
      //Save post
      post.save()
        .then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
});


module.exports = router;