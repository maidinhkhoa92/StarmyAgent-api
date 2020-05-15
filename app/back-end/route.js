const express = require('express');
const router = express.Router();
const Token = require('../helper/token');

// admin
const admin = require("./admin")
const adminValidate = require("./admin/validate")
router.post("/admin", adminValidate.create, admin.create )
router.post("/login", adminValidate.create, admin.login)

// user
const user = require("./user")
// get agency
router.get("/user", Token , user.list )
// post (adding) Agency
router.post("/user/register", Token, user.register)
// delete Agency
router.post("/user/:id", Token, user.delete)
// get Agents inside Agency
router.get("/user/:id", Token , user.list )
// get Agent 
router.get("/agent/:id", Token , user.find )

// Comment
const guestComment = require("./comment")
router.get("/comment", Token, guestComment.list)
router.post("/comment/:id", Token, guestComment.update)


// city
const city = require("../front-end/city");
router.get("/city", Token , city.list);

// notes
const notes = require("./notes/index")
const notesValidate = require("./notes/validate")
router.get("/notes/:id", Token, notes.list)
router.post("/notes", Token, notesValidate.create, notes.create)

module.exports = router;
