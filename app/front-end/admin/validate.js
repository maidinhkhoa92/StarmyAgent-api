const { body } = require("express-validator");

module.exports.create = [
  body("type")
    .not()
    .isEmpty()
    .withMessage("Type is required")
    .isIn(["street", "square", "avenue", "walk", "passage"]),
  body("streetName")
    .not()
    .isEmpty()
    .withMessage("Street is required"),
  body("block")
    .not()
    .isEmpty()
    .withMessage("Block is required"),
  body("floor")
    .not()
    .isEmpty()
    .withMessage("Floor is required"),
  body("postCode")
    .not()
    .isEmpty()
    .withMessage("Post Code is required"),
  body("city")
    .not()
    .isEmpty()
    .withMessage("City is required"),
  body("file").isString()
];
