const ERRORS = require('../config/ERRORS');

module.exports = (err, req, res, next) => {
    let code = 99999;
    if( err.code ) {
        code = err.code
    }
    res.status(400).send({message: ERRORS[code]})
}