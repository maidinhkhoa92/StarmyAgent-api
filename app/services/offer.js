const Offer = require("../models/offer");
const EMAIL = require("../config/EMAIL");
const transporter = require("../helper/nodemailer");

module.exports.create = (body, agent, twice = false) => {
  return new Promise((resolve, reject) => {
    Offer.create(body, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const mailOptions = {
        from: body.email,
        to: agent.email,
        subject: EMAIL.offer.title,
        text: twice ? EMAIL.offer.repeated(data) : EMAIL.offer.oneTime(data)
      };

      transporter.sendMail(mailOptions, function(error) {
        if (err) {
          reject({ code: 11 });
          return;
        }

        resolve(convertData(data));
      });
    });
  });
};

module.exports.findOne = query => {
  return new Promise((resolve, reject) => {
    Offer.findOne(query, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(data));
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
