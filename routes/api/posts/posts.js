const express = require('express');
const router = express.Router();


//Load Post Model
const Post = require('../../../models/Post_Scheema');

//@route   Get api/posts/test
//desc     Test post route
//@access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts works'}));

//@route   Get api/posts
//desc     Get posts
//@access  Public
router.get('/', (req,res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});

module.exports = router;