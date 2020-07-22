const EMAIL = require("../config/EMAIL");
const transporter = require("../helper/nodemailer");

module.exports.shareEmail = body => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: body.fromEmail,
      to: body.toEmail,
      subject: EMAIL.share.title,
      html: body.content
    };

    transporter.sendMail(mailOptions, function (error) {
      if (err) {
        reject({ code: 11 });
        return;
      }

      resolve({message: 'Complete'});
    });
  });
}