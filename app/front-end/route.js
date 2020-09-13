const express = require("express");
const router = express.Router();
const Token = require("../helper/token");

/*
  ***** user Router ******
*/
const user = require("./user");
const userValidate = require("./user/validate");

router.post("/login", userValidate.login, user.login);
router.post("/send-verify-code", userValidate.sendVerifyCode, user.sendVerifyCode);
router.post("/confirm-verify-code", userValidate.confirmVerifyCode, user.confirmVerifyCode);
router.post("/forgot-password", userValidate.forgotPassword, user.forgotPassword);
router.post("/reset-password", Token, userValidate.resetPassword, user.resetPassword);
router.put("/user/:id", Token, userValidate.updateInformation, user.update);
router.patch("/photo/:id", Token, userValidate.userPhotoUpdating, user.update);
router.patch("/banner/:id", Token, userValidate.userBannerUpdating, user.update);
router.post("/agency/register", userValidate.registerAgency, user.register);
router.post("/agent/register", userValidate.registerAgent, user.register);
router.post("/agent/confirm", userValidate.agentConfirm, user.confirm);

// Property tab
const property = require("./property");
const propertyValidate = require("./property/validate");
router.post("/user/property", Token, propertyValidate.create, property.create);
router.put("/user/property/:id", Token, propertyValidate.create, property.update);
router.get("/user/property", Token, propertyValidate.get, property.list);
router.get("/user/property/:id", propertyValidate.detail, property.detail);

// Historical Tab
const address = require("./address");
const addressValidate = require("./address/validate");
router.post("/agent/address", Token, addressValidate.create, address.create);
router.put("/agent/address/:id", Token, addressValidate.create, address.update);
router.get("/agent/address", Token, address.list);

// Agents tab (agency only)
router.post("/agency/agent", Token, userValidate.addingAgent, user.register);
router.patch("/agency/agent/:id", Token, userValidate.changeAgentStatus, user.update);
router.put("/agency/agent/:id", Token, userValidate.updateAgent, user.update);
router.get("/agency/agent", Token, userValidate.getAgent, user.list);

// Comment tab
const comment = require("./comment");
const commentValidate = require("./comment/validate");
router.put("/user/comment/:id", Token, commentValidate.reply, comment.reply);
router.get("/user/comment", Token, commentValidate.get, comment.list);

// add
router.patch("/agent/:id", Token, userValidate.agentAddCard, user.update);

// Payment
const payment = require("./payment");
const paymentValidate = require("./payment/validate");
router.post("/agency/payment", Token, paymentValidate.agencySubmitPayment, payment.create);

// city
const city = require("./city");
router.get("/city", city.list);
router.get("/city-home", city.listHome);

// district
const district = require("./district");
router.get("/district", district.list);
router.get("/search-district", district.search)

/*
  ***** Guest Router ******
*/

// Comment
const guestComment = require("./guest/comment");
const guestCommentValidate = require("./guest/comment/validate");
router.post("/comment", guestCommentValidate.create, guestComment.create);
router.put("/comment", Token, guestComment.update);
router.get("/comment", guestComment.list);

// Agents
const guestAgents = require("./guest/agents");
router.get("/agent", guestAgents.list);
router.get("/agent/:id", guestAgents.detail);
router.get("/search-agent", guestAgents.search);

// Properties
const guestProperties = require("./guest/properties");
router.get("/property", guestProperties.list);

// Address
const guestAddresses = require("./guest/address");
router.get("/address", guestAddresses.list);

// Contact 
const guestContact = require("./guest/contact");
const guestContactValidate = require("./guest/contact/validate");
router.post("/contact", guestContactValidate.create, guestContact.create);
router.post("/send-email", guestContactValidate.sendEmail, guestContact.sendEmail)
router.post("/new-agency", guestContactValidate.newAgency, guestContact.newAgency)

// Contact 
const guestOffer = require("./guest/offer");
const guestOfferValidate = require("./guest/offer/validate");
router.post("/offer", guestOfferValidate.create, guestOffer.create);

// Contact 
const guestRequest = require("./guest/request");
const guestRequestValidate = require("./guest/request/validate");
router.post("/request", guestRequestValidate.create, guestRequest.create);

// Report
const Report = require("./report");
router.get("/report/:id", Token, Report.list);
router.get("/current-report/:id", Token, Report.currentReport);

const Calculation = require("./calculation");
router.get("/calculation", Calculation.data)
router.post("/calculation", Calculation.result)

// Sharing 
const shareRequest = require("./guest/share");
const shareRequestValidate = require("./guest/share/validate");
router.post("/share", shareRequestValidate.sendEmail, shareRequest.sendEmail);

module.exports = router;
