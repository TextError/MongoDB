const express = require('express');
const router = express.Router();


//Load Post Model
const Post = require('../../../models/Post_Scheema');

//@route   Get api/posts/:id
//desc     Get posts by ID
//@access  Public
router.get('/:id', (req,res) => {
  Post.findById( req.params.id )
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}));
});

module.exports = router;