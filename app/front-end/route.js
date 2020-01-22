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
router.post("/agency/property", Token, propertyValidate.create, property.create);
router.get("/agency/property", Token, propertyValidate.get, property.list);

// city
const city = require("./city");
router.get("/city", city.list);

module.exports = router;
