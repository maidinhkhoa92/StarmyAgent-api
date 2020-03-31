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

module.exports.newAgency = [
  body("city")
    .isString()
    .not()
    .isEmpty()
    .withMessage("City is required"),
  body("managerName")
    .not()
    .isEmpty()
    .withMessage("Manager Name is required"),
  body("agencyName")
    .not()
    .isEmpty()
    .withMessage("Agency Name is required"),
  body("amount")
    .not()
    .isEmpty()
    .withMessage("Amount is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("telephone")
    .not()
    .isEmpty()
    .withMessage("Telephone is required")
];
