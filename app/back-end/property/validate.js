const { body } = require("express-validator");

module.exports.changeStatus = [
  body("status")
    .not()
    .isEmpty()
    .withMessage("Status is required")
    .isString(),
];