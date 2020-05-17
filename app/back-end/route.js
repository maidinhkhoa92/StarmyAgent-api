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
// get Agency & Agent
router.get("/user", Token , user.list )
// adding Agency & Agent
router.post("/user/register", Token, user.register)
// delete Agency & Agent
router.post("/user/:id", Token, user.delete)
// get Agents inside Agency
router.get("/user/:id", Token , user.list )
// get Agent detail for Description ( FE )
router.get("/agent/:id", Token , user.find )

// Comment
const guestComment = require("./comment")
router.get("/comment", Token, guestComment.list)
router.post("/comment/:id", Token, guestComment.update)


// city
const city = require("./city");
router.get("/city", Token , city.list);

// notes
const notes = require("./notes/index")
const notesValidate = require("./notes/validate")
router.get("/notes/:id", Token, notes.list)
router.post("/notes", Token, notesValidate.create, notes.create)
router.post("/notes/delete/:id", Token, notes.delete)
router.post("/notes/update/:id", Token, notes.update)

// property
const property = require("./property");
router.get("/property", Token , property.list);

module.exports = router;
