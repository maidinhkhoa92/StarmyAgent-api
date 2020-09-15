const comment = require("../../services/comment");
const { validationResult } = require("express-validator");


module.exports.reply = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.params;

    const data = await comment.update(id, {...req.body, replied: true});
    res.status(200).send(data);
  } catch (err) {
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
    const { id } = req.decoded;
    const { paged, limit } = req.query;

    query.agent = id;

    const data = await comment.list(query, paged, limit);
    res.status(200).send(data);
  } catch (err) {
    console.log(err)
    next(err);
  }
};
