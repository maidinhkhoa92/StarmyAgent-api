var nodemailer = require("nodemailer");

// Configurations
const APP_CONFIG = require("../config/APP_CONFIG");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(APP_CONFIG.mail);

module.exports = transporter;
