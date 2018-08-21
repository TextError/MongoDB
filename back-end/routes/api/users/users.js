const express = require('express');
const router = express.Router();
const passport = require('passport');

//@route   Get api/users/test
//desc     Test users route
//@access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users works'}));

//-------------------------------------------

//@route   Get api/users/current
//desc     Return currenct user
//@access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req,res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

//-------------------------------------------

module.exports = router;