const { body } = require("express-validator");

module.exports.create = [
  body("message").isString(),
  body("address").isString(),
  body("budget").isString(),
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
  body("agent")
    .not()
    .isEmpty()
    .withMessage("Agent is required"),
  body("telephone")
    .not()
    .isEmpty()
    .withMessage("Telephone is required"),
  body("type")
    .isIn(["rent", "sale"])
    .withMessage("Type must be 'rent', 'sale'")
    .not()
    .isEmpty()
    .withMessage("Type is required")
];
