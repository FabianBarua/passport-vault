const express = require('express');
const { isUserAuthenticated } = require('../../middlewares/auth');

const router = express.Router();

router.get('/auth/user', isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.json({ message: 'You have been logged out!' });
});

module.exports = router;
