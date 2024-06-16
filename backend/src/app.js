const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieSession = require('cookie-session');

require('./auth/passport');
require('./auth/passportGoogleSSO');

require('./models/user');
require('./models/vault');

const passport = require('passport');
const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
