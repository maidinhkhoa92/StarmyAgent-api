const express = require('express');
const router = express.Router();
const Token = require('../helper/token');

// user
const Test = require("./test");

router.post("/test", Test.create);

module.exports = router;
