const { body } = require("express-validator");

module.exports.sendEmail = [
  body("content").isString(),
  body("link")
    .not()
    .isEmpty()
    .withMessage("Link is required"),
  body("fromEmail")
    .not()
    .isEmpty()
    .withMessage("Sender is required"),
  body("toEmail")
    .not()
    .isEmpty()
    .withMessage("Receiver is required"),
];
