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
router.get("/user", Token , user.fetch )
module.exports = router;
