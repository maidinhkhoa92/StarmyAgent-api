const { body } = require("express-validator");

module.exports.create = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required"),
  body("description").isString(),
  body("price")
    .isNumeric()
    .withMessage("Price must be numberic")
    .not()
    .isEmpty()
    .withMessage("Price is required"),
  body("type")
    .isIn(["rent", "sale"])
    .withMessage("Type must be rent or sale")
    .not()
    .isEmpty()
    .withMessage("Status is required"),
  body("bedRoom")
    .isNumeric()
    .withMessage("Bed Room must be numberic")
    .not()
    .isEmpty()
    .withMessage("Bed Room  is required"),
  body("bathRoom")
    .isNumeric()
    .withMessage("Bath Room must be numberic")
    .not()
    .isEmpty()
    .withMessage("Bath Room is required"),
  body("area")
    .isNumeric()
    .withMessage("Area must be numberic")
    .not()
    .isEmpty()
    .withMessage("Area is required"),
  body("city")
    .not()
    .isEmpty()
    .withMessage("City is required"),
  body("district")
    .not()
    .isEmpty()
    .withMessage("District is required"),
  body("photo").isArray(),
  body("characteristic").isArray(),
];

module.exports.get = [];

module.exports.detail = [];

