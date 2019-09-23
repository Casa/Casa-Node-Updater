const express = require('express');
const router = express.Router();

const applicationLogic = require('logic/application.js');
const auth = require('middlewares/auth.js');
const safeHandler = require('utils/safeHandler');

router.post('/', auth.convertReqBodyToBasicAuth, auth.basic, safeHandler((req, res) =>
  applicationLogic.update()
    .then(() => res.json())
));

module.exports = router;
