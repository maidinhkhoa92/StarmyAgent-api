const express = require('express');
const router = express.Router();
const Token = require('../helper/token');

//admin
const admin = require("./admin")
const adminValidate = require("./admin/validate")
router.post("/admin", adminValidate.create, admin.create )
router.post("/login", adminValidate.create, admin.login)

//user
const user = require("./user")
//get agency
router.get("/user", Token , user.fetch )
// post agent from agency
router.post("/agency/register", Token, user.register)


// city
const city = require("../front-end/city");
router.get("/city", city.list);

module.exports = router;
