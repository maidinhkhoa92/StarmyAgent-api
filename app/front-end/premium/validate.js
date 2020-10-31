const { body } = require("express-validator");

module.exports.upPremium = [
  body("token")
    .not()
    .isEmpty()
    .withMessage("This field is required"),
  body("time")
    .isIn(["yearly", "monthly"])
    .withMessage("Period only has 2 values: Annual, Monthly")
    .not()
    .isEmpty()
    .withMessage("period is required"),
];
