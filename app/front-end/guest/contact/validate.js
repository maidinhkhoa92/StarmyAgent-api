const { body } = require("express-validator");

module.exports.create = [
  body("message").isString(),
  body("lName")
    .not()
    .isEmpty()
    .withMessage("Last name is required"),
  body("fName")
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("telephone")
    .not()
    .isEmpty()
    .withMessage("Telephone is required"),
  body("agent")
    .not()
    .isEmpty()
    .withMessage("Agent is required")
];

module.exports.sendEmail = [
  body("content").isString(),
  body("fullName")
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("telephone")
    .not()
    .isEmpty()
    .withMessage("Telephone is required")
];
