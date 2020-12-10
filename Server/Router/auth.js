const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {scope: ['profile', 'email']}),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/Interest');
  },
);
// //const transformGoogleProfile = (profile) => ({
//   name: profile.displayName,
//   avatar: profile.image.url,
// });

module.exports = router;
