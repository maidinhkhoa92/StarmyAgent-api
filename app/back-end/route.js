const express = require('express');
const router = express.Router();
const Token = require('../helper/token');

//admin
const admin = require("./admin")
const adminValidate = require("./admin/validate")
router.post("/admin", adminValidate.create, admin.create )
router.get("/agency", admin.fetch )
router.post("/login", adminValidate.create, admin.login)

module.exports = router;
