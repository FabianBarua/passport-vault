const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    () => {
    }
  );

  if (!userWithEmail) {
    return res
      .status(400)
      .json({ message: 'Email or password does not match!' });
  }

  if (userWithEmail.password !== password) {
    return res
      .status(400)
      .json({ message: 'Email or password does not match!' });
  }

  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  return res.json({ message: 'Welcome Back!', token: jwtToken });
});

module.exports = router;
