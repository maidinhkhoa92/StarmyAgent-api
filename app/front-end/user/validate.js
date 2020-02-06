const { body, query } = require("express-validator");

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
    .withMessage("Status is required")
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

module.exports.changeAgentStatus = [
  body("disabled")
    .isIn([false, true])
    .withMessage("Disabled must be false or true")
    .not()
    .isEmpty()
    .withMessage("Status is required")
];

module.exports.updateAgent = [
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
    .withMessage("Email is required")
];

module.exports.getAgent = [];

module.exports.agentAddCard = [
  body("card.type")
    .not()
    .isEmpty()
    .withMessage("Card type is required"),
  body("card.number")
    .not()
    .isEmpty()
    .withMessage("Number is required"),
  body("card.expired")
    .not()
    .isEmpty()
    .withMessage("Expired date is required"),
  body("card.code")
    .not()
    .isEmpty()
    .withMessage("Code is required")
];

module.exports.agentUpdating = [
  body("agentCertificateDate")
    .not()
    .isEmpty()
    .withMessage("Cert date is required"),
  body("languages")
    .isArray()
    .withMessage("Languages must be array")
    .not()
    .isEmpty()
    .withMessage("languages is required"),
  body("services")
    .isArray()
    .withMessage("Services must be array")
    .not()
    .isEmpty()
    .withMessage("Services is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .not()
    .isEmpty()
    .withMessage("Telephone is required"),
  body("telephone")
    .not()
    .isEmpty()
    .withMessage("Telephone is required"),
  body("description").isString(),
  body("social.website").isString(),
  body("social.facebook").isString(),
  body("social.linkedin").isString(),
  body("social.twitter").isString(),
  body("social.youtube").isString()
];
