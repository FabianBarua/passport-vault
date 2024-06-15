const express = require('express');
const passport = require('passport');

const router = express.Router();

const successLoginUrl = 'http://localhost:5000/api/v1/auth/google/success';
const errorLoginUrl = 'http://localhost:5000/api/v1/auth/google/error';

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  })
);

router.get('/auth/google/success', (req, res) => {
  res.send('Thank you for signing in!');
});

router.get('/auth/google/error', (req, res) => {
  res.send('Cannot login to Google, please try again later!');
});

module.exports = router;
