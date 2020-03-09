const Login = require('../../services/login');

module.exports.create = async (req, res) => {
    try {
        const data = await Login.create(req.body)
        res.status(200).send(data)
    } catch(e) {
        console.log(e)
    }
}