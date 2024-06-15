const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch();

  if (alreadyExistsUser) {
    return res.status(409).json({ message: 'User with email already exists!' });
  }

  const newUser = new User({ fullName, email, password });
  const savedUser = await newUser.save().catch(() => res.status(500).json({ error: 'Cannot register user at the moment!' }));

  if (savedUser) {
    return res.json({ message: 'Thanks for registering' });
  }

  return res.status(500).json({ message: 'Internal server error' });
});

module.exports = router;
