const comment = require("../../services/comment");

module.exports.list = async (req, res, next) => {
    try {
      let query = {};
      const { paged, limit,  detail } = req.query;
      
      const data = await comment.list(query, paged, limit, detail);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };
  
  module.exports.update = async (req, res, next) => {
    try {
      const { id} = req.params;
      const data = await comment.update(id, {status: 'public'});
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };