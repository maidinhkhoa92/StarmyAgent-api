const comment = require("../../../services/comment");
const { validationResult } = require("express-validator");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const reqBody = req.body;

    if (reqBody.address === 'others') {
      delete reqBody.address;
    }

    const data = await comment.create(req.body);
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
    const { id, email } = req.decoded;
    const Comment = await comment.detail(id);

    if(email !== Comment.email) {
      throw ({code: 99999})
    }

    const data = await comment.update(id, {status: 'draft'});
    res.status(200).send(data);
  } catch (err) {
    console.log(err)
    next(err);
  }
}

module.exports.list = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    let query = {};
    const { paged, limit, agent } = req.query;

    if (agent) {
      query.agent = agent;
      query.status = 'public';
    }

    const data = await comment.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
