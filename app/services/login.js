const Login = require("../models/login");

module.exports.create = body => {
    return new Promise((resolve, reject) => {
        Login.create(body, function(err, data) {
    if (err) {
        reject(err);
        return;
    } resolve(data)
})
    })
}