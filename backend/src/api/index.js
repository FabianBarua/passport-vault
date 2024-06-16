const express = require('express');
const registerApi = require('./v1/register');
const loginApi = require('./v1/login');
const loginWithGoogleApi = require('./v1/loginWithGoogle');
const userApi = require('./v1/auth');
const vault = require('./v1/vault');

const router = express.Router();

router.use('/v1', registerApi);
router.use('/v1', loginApi);
router.use('/v1', loginWithGoogleApi);
router.use('/v1', userApi);
router.use('/v1', vault);

module.exports = router;
