require('module-alias/register');
require('module-alias').addPath('.');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const errorHandleMiddleware = require('middlewares/errorHandling.js');
require('middlewares/auth.js');
const ping = require('routes/ping.js');
const update = require('routes/v1/update.js');

const app = express();

app.use(cors('*'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/ping', ping);
app.use('/v1/update', update);


app.use(errorHandleMiddleware);
app.use((req, res) => {
  res.status(404).json(); // eslint-disable-line no-magic-numbers
});

module.exports = app;
