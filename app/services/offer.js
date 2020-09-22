const Offer = require("../models/offer");
const EMAIL = require("../config/EMAIL");
const transporter = require("../helper/nodemailer");
const _ = require('lodash');

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
        html: twice ? EMAIL.offer.repeated(data) : EMAIL.offer.oneTime(data)
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

module.exports.report = body => {
  return new Promise((resolve, reject) => {
    Offer.count(body, (err, count) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(count)
    });
  });
};

module.exports.list = (query = {}, paged = -1, limit = 10) => {
  return new Promise((resolve, reject) => {
    let options = {};

    if (limit) {
      limit = parseInt(limit);
      options.limit = limit;
    }

    if (paged) {
      limit = parseInt(paged);
      options.page = paged;
    }

    if (paged && paged === -1) {
      options.pagination = false
    }

    Offer.paginate(query, options, async (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result.docs) {
        reject({ code: 10000 });
        return;
      }
      resolve({
        ...result,
        docs: _.map(result.docs, item => convertData(item))
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
