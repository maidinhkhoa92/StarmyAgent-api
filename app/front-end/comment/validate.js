const { body } = require("express-validator");

module.exports.reply = [
  body("reply_message")
    .not()
    .isEmpty()
    .withMessage("Message is required"),
];

module.exports.get = [
];
