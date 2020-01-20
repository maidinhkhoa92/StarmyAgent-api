const express = require("express");
const router = express.Router();
const Token = require("../helper/token");

// user
const user = require("./user");
const userValidate = require("./user/validate");

router.post("/login", userValidate.login, user.login);
// agency interface
router.post("/agency/register", userValidate.registerAgency, user.register);
router.post("/agency/agent", userValidate.addingAgent, user.register);

// agent interface
router.post("/agent/register", userValidate.registerAgent, user.register);

// city
const city = require("./city");
router.get("/city", city.list);

module.exports = router;
