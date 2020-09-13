const user = require("../../services/user");
const { validationResult } = require("express-validator");
const EMAIL = require("../../config/EMAIL");
const { v4: uuidv4 } = require('uuid');

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;
  try {
    const data = await user.login(email, password);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const data = await user.register(req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.params;
    const data = await user.update(id, req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.list = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    let query = {};
    const { id, type } = req.decoded;
    const { paged, limit } = req.query;
    if (type === "agency") {
      query = {
        agency: id
      }
    }
    
    const data = await user.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.confirm = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { email, password } = req.body;
    const query = {
      email: email
    }
    const Agent = await user.find(query);

    if(Agent.status) {
      throw ({code: 10})
    }

    const params = {
      password: password,
      status: true
    }
    const data = await user.update(Agent.id, params)
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { email } = req.body;

    const data = await user.forgotPassword(email);
    
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { password } = req.body;
    const { email } = req.decoded;

    const User = await user.find({ email });

    const data = await user.update(User.id, {password});
    
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.sendVerifyCode = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { email } = req.body;

    const User = await user.find({ email });

    if (email !== User.email) {
      throw ({code: 11})
    }

    // generate mail content
    const verifyCode = uuidv4();
    const mailOptions = {
      to: email,
      subject: EMAIL.verify.title,
      html: EMAIL.verify.message(verifyCode),
    }
    await user.sendEmail(mailOptions);
    const data = await user.update(User.id, { verifyCode })
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.confirmVerifyCode = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { verifyCode, email } = req.body;
    const User = await user.find({ email }, false, true);
    if (verifyCode !== User.verifyCode) {
      throw ({code: 13})
    }

    await user.update(User.id, { verified: true })
    
    res.status(200).send('Success');
  } catch (err) {
    next(err);
  }
};