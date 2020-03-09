const express = require('express');
const router = express.Router();
const Token = require('../helper/token');

// user
const Test = require("./test");
//login
const Login = require("./login");

router.post("/test", Test.create);
router.post("/login", Test.create);

module.exports = router;
