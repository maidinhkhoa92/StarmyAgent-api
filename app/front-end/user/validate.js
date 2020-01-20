const { body } = require("express-validator");

module.exports.login = [
  body("email")
    .isEmail()
    .withMessage("Invalid format email")
    .not()
    .isEmpty()
    .withMessage("Password is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .not()
    .isEmpty()
    .withMessage("Password is required")
];

module.exports.registerAgency = [
  body("city")
    .not()
    .isEmpty()
    .withMessage("City is required"),
  body("company.owner")
    .not()
    .isEmpty()
    .withMessage("Owner is required"),
  body("company.name")
    .not()
    .isEmpty()
    .withMessage("Company name is required"),
  body("company.numberAgent")
    .isNumeric()
    .withMessage("The number of agent must be number")
    .not()
    .isEmpty()
    .withMessage("The number of agent is required"),
  body("telephone")
    .not()
    .isEmpty()
    .withMessage("Telephone is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid format email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .not()
    .isEmpty()
    .withMessage("Password is required"),
  body("type")
    .equals("agency")
    .withMessage("This user must be agency")
];

module.exports.addingAgent = [
  body("agency")
    .not()
    .isEmpty()
    .withMessage("You need to add an agency"),
  body("city")
    .not()
    .isEmpty()
    .withMessage("City is required"),
  body("fName")
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  body("lName")
    .not()
    .isEmpty()
    .withMessage("Last name is required"),
  body("telephone")
    .not()
    .isEmpty()
    .withMessage("Telephone is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid format email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("type")
    .equals("agent")
    .withMessage("This user must be agent"),
  body("status")
    .isIn([false])
    .not()
    .isEmpty()
    .withMessage("Status is required"),
];

module.exports.registerAgent = [
  body("city")
    .not()
    .isEmpty()
    .withMessage("City is required"),
  body("fName")
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  body("lName")
    .not()
    .isEmpty()
    .withMessage("Last name is required"),
  body("telephone")
    .not()
    .isEmpty()
    .withMessage("Telephone is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid format email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .not()
    .isEmpty()
    .withMessage("Password is required"),
  body("type")
    .equals("agent")
    .withMessage("This user must be agent")
];
