const express = require("express");
const router = express.Router();
const Token = require("../helper/token");

// user
const user = require("./user");
const userValidate = require("./user/validate");

router.post("/login", userValidate.login, user.login);
// agency interface
router.post("/agency/register", userValidate.registerAgency, user.register);
router.post("/agency/agent", Token, userValidate.addingAgent, user.register);
router.patch("/agency/agent/:id", Token, userValidate.changeAgentStatus, user.update);
router.put("/agency/agent/:id", Token, userValidate.updateAgent, user.update);
router.get("/agency/agent", Token, userValidate.getAgent, user.list);

// agent interface
router.post("/agent/register", userValidate.registerAgent, user.register);
router.patch("/agent/:id", Token, userValidate.agentAddCard, user.update);
router.put("/agent/:id", Token, userValidate.agentUpdating, user.update);

// Payment
const payment = require("./payment");
const paymentValidate = require("./payment/validate");
router.post("/agency/payment", Token, paymentValidate.agencySubmitPayment, payment.create);

// Property
const property = require("./property");
const propertyValidate = require("./property/validate");
router.post("/agent/property", Token, propertyValidate.create, property.create);
router.put("/agent/property/:id", Token, propertyValidate.create, property.update);
router.get("/agent/property", Token, propertyValidate.get, property.list);

// Property
const address = require("./address");
const addressValidate = require("./address/validate");
router.post("/agent/address", Token, addressValidate.create, address.create);
router.put("/agent/address/:id", Token, addressValidate.create, address.update);
router.get("/agent/address", Token, property.list);

// city
const city = require("./city");
router.get("/city", city.list);

/*
  ***** Guest Router ******
*/

// Comment
const guestComment = require("./guest/comment");
const guestCommentValidate = require("./guest/comment/validate");
router.post("/comment", guestCommentValidate.create, guestComment.create);
router.get("/comment", guestComment.list);

// Agents
const guestAgents = require("./guest/agents");
router.get("/agent", guestAgents.list);
router.get("/agent/:id", guestAgents.detail);

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

// Contact 
const guestOffer = require("./guest/offer");
const guestOfferValidate = require("./guest/offer/validate");
router.post("/offer", guestOfferValidate.create, guestOffer.create);

// Contact 
const guestRequest = require("./guest/request");
const guestRequestValidate = require("./guest/request/validate");
router.post("/request", guestRequestValidate.create, guestRequest.create);

module.exports = router;
