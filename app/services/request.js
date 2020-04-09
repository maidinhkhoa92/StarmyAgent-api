const Request = require("../models/request");
const EMAIL = require("../config/EMAIL");
const transporter = require("../helper/nodemailer");

module.exports.create = body => {
  return new Promise((resolve, reject) => {
    Request.create(body, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const mailOptions = {
        from: body.email,
        to: APP_CONFIG.adminEmail,
        subject: EMAIL.request.title,
        html: EMAIL.request.content(data)
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
