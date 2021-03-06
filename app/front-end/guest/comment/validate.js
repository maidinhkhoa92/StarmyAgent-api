const { body, query } = require("express-validator");

module.exports.create = [
  body("date")
    .not()
    .isEmpty()
    .withMessage("Date is required"),
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
  body("address")
    .not()
    .isEmpty()
    .withMessage("Address is required"),
  body("type")
    .isIn(["Seller", "Buyer", "Renter", "Tenant"])
    .withMessage("Type must be 'Seller', 'Buyer', 'Renter', 'Tenant'")
    .not()
    .isEmpty()
    .withMessage("Type is required"),
  body("rate.sum")
    .isNumeric()
    .not()
    .isEmpty()
    .withMessage("Total is required"),
  body("rate.options")
    .not()
    .isEmpty()
    .withMessage("Rating is required")
];

module.exports.get = [
  query("agent")
    .not()
    .isEmpty()
    .withMessage("Agent is required")
];
