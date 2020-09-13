const { body, query } = require("express-validator");

module.exports.reply = [
  body("reply_message")
    .not()
    .isEmpty()
    .withMessage("Message is required"),
];

module.exports.get = [
  query("agent")
    .not()
    .isEmpty()
    .withMessage("Agent is required")
];
