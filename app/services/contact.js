const Contact = require("../models/contact");
const transporter = require("../helper/nodemailer");
const APP_CONFIG = require("../config/APP_CONFIG");
const EMAIL = require("../config/EMAIL");

module.exports.create = body => {
  return new Promise((resolve, reject) => {
    Contact.create(body, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(data));
    });
  });
};

module.exports.findOne = (query) => {
  return new Promise((resolve, reject) => {
    Contact.findOne(query, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(data));
    });
  });
};

module.exports.sendEmail = body => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: body.adminEmail,
      to: APP_CONFIG.adminEmail,
      subject: EMAIL.contact.title,
      text: EMAIL.contact.message(body)
    };
    transporter.sendMail(mailOptions, function(error) {
      if (error) {
        reject({ code: 11 });
        return;
      }

      resolve({ status: 200 });
    });
  });
};

module.exports.newAgency = body => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: body.email,
      to: APP_CONFIG.adminEmail,
      subject: EMAIL.newAgency.title,
      text: EMAIL.newAgency.message(body)
    };
    transporter.sendMail(mailOptions, function(error) {
      if (error) {
        reject({ code: 11 });
        return;
      }

      resolve({ status: 200 });
    });
  });
};

const convertData = data => {
  var result = data;
  if (data === null || data === undefined) {
    return null;
  }
  if (data.toObject) {
    result = data.toObject();
  }
  result.id = data._id;
  delete result._id;
  delete result.__v;
  return result;
};
