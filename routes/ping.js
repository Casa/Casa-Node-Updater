const express = require('express');
const pjson = require('../package.json');
const router = express.Router();

router.get('/', function(req, res) {
  res.json({version: 'update-manager-' + pjson.version});
});

module.exports = router;
