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
    .withMessage("This user must be agency"),
  body("level")
    .not()
    .isEmpty()
    .withMessage("Level is required"),
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
    .withMessage("This user must be agent"),
  body("level")
    .not()
    .isEmpty()
    .withMessage("Level is required"),
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

module.exports.updateInformation = [
  body("agentCertificateDate").isString(),
  body("languages")
    .isArray()
    .withMessage("Languages must be array"),
  body("services")
    .isArray()
    .withMessage("Services must be array"),
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("telephone").isString(),
  body("description").isString(),
  body("social.website").isString(),
  body("social.facebook").isString(),
  body("social.linkedin").isString(),
  body("social.twitter").isString(),
  body("social.youtube").isString(),
  body("agency_name").isString(),
  body("completed")
    .isIn([false, true])
    .withMessage("Completed must be false or true")
];

module.exports.userPhotoUpdating = [
  body("photo")
    .not()
    .isEmpty()
    .withMessage("Photo is required")
];

module.exports.userBannerUpdating = [
  body("banner")
    .not()
    .isEmpty()
    .withMessage("Banner is required")
];

module.exports.agentConfirm = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .not()
    .isEmpty()
    .withMessage("Password is required")
];

module.exports.forgotPassword = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
];

module.exports.resetPassword = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .not()
    .isEmpty()
    .withMessage("Password is required")
];

module.exports.sendVerifyCode = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
];

module.exports.confirmVerifyCode = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("verifyCode")
    .not()
    .isEmpty()
    .withMessage("Verify Code is required"),
];