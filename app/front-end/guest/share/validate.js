const { body } = require("express-validator");

module.exports.sendEmail = [
  body("content").isString(),
  body("fromEmail")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("toEmail")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
];
