const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign(user, process.env.SECRET_PASS, {
        expiresIn: '1y'
    })
}