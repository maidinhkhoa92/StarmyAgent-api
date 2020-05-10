const { body } = require("express-validator");

module.exports.create = [
  body("email")
    .isEmail()
    .withMessage("Invalid format email")
    .not()
    .isEmpty()
    .withMessage("Password is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .not()
    .isEmpty()
    .withMessage("Password is required")
];
