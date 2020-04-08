const Comment = require("../models/comment");
const _ = require("lodash");
const transporter = require("../helper/nodemailer");
const EMAIL = require("../config/EMAIL");
const APP_CONFIG = require("../config/APP_CONFIG");
const jwt = require("jsonwebtoken");

const create = body => {
  return new Promise((resolve, reject) => {
    Comment.create(body, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      // generate token
      const verifyData = {
        email: data.email,
        id: data._id,
      }
      const token = jwt.sign(verifyData, APP_CONFIG.token);

      // Send email
      const mailOptions = {
        from: APP_CONFIG.adminEmail,
        to: data.email,
        subject: EMAIL.comment.title,
        html: EMAIL.comment.message(token)
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

const update = (id, body) => {
  return new Promise((resolve, reject) => {
    const query = {
      _id: id
    };
    
    Comment.findOneAndUpdate(query, body, { new: true }, function(err, data) {
      if (err) {
        reject(err);
      }

      resolve(convertData(data));
    });
  });
};

const detail = (id) => {
  return new Promise((resolve, reject) => {
    Comment.findById(id, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(res));
    })
  });
};

const list = (query, paged, limit) => {
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

    Comment.paginate(query, options, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        if (result.docs === null) {
          reject({ code: 10000 });
          return;
        }
        resolve({
          ...result,
          docs: _.map(result.docs, item => {
            return convertData(item);
          })
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

module.exports = {
  create,
  list,
  detail,
  update
};
