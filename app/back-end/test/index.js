const Test = require('../../services/test');

module.exports.create = async (req, res) => {
    try {
        const data = await Test.create(req.body)
        res.status(200).send(data)
    } catch(e) {
        console.log(e)
    }
}