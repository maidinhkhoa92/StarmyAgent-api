const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const Token = require('../helper/token');

// admin
const admin = require('./controller/admin');

router.post('/login', validate(admin.login.Validate), admin.login.handler);
router.post('/init', admin.init.handler);

module.exports = router;
