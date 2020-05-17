const property = require("../../services/property");

module.exports.list = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.status(401).send({ errors: errors.array() });
    //   return;
    // }
    try {
        const query = {
          agent: req.params.id
        }
      const data = await property.list();
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };