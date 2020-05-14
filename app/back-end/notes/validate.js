const { body } = require("express-validator");

module.exports.create = [
  body("message")
    .not()
    .isEmpty()
    .isString(),
];