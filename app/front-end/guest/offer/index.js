const offer = require("../../../services/offer");
const user = require("../../../services/user");
const { validationResult } = require("express-validator");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { agent, email, telephone } = req.body;
    let twice = false;

    // Check if Agent exist
    const Agent = await user.detail(agent);
    if (!Agent) {
      throw ({code: 8})
    }

    // Check if offer exist
    const query = {
      email,
      telephone
    }
    const Offer = await offer.findOne(query)
    if (Offer) {
      twice = true
    }
    
    const data = await offer.create(req.body, Agent, twice);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};
