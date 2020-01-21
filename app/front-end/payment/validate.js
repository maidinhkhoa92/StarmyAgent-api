const { body } = require("express-validator");

module.exports.agencySubmitPayment = [
  body("numberOfAgent")
    .isNumeric()
    .withMessage("This field must be number")
    .not()
    .isEmpty()
    .withMessage("This field is required"),
  body("period")
    .isIn(["Annual", "Monthly"])
    .withMessage("Period only has 2 values: Annual, Monthly")
    .not()
    .isEmpty()
    .withMessage("period is required"),
  body("amountDiscount")
    .isNumeric()
    .withMessage("This field must be number")
    .not()
    .isEmpty()
    .withMessage("This field is required"),
  body("discountPerPeriod")
    .isNumeric()
    .withMessage("This field must be number")
    .not()
    .isEmpty()
    .withMessage("This field is required"),
  body("total")
    .isNumeric()
    .withMessage("This field must be number")
    .not()
    .isEmpty()
    .withMessage("This field is required"),
  body("paymentMethod")
    .isIn(["Transfer", "Credit card"])
    .withMessage("Payment Method only has 2 values: Transfer, Credit card")
    .not()
    .isEmpty()
    .withMessage("Payment Method is required")
];
