require('dotenv').config()

const userModel = require('../models/user'),
    LocalStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    JwtStrategy = require('passport-jwt').Strategy,
    passport = require('passport')
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_PASS
};
exports.localStrategy = new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
    console.log("localStrategy")
    console.log(username)
    const user = await userModel.findOne({
        email: username,
        password: password
    }).exec()
    if (!user) return done(null, false, 'Error in username or password')
    return done(null, user)
})

// exports.jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
//     console.log("jwtStrategy", payload)
//     const user = await userModel.findById(payload._id)
//     if (!user) return done(null, false)
//     return done(null, user)
// })

exports.jwtUserStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    console.log("jwtUserStrategy", payload);
    const user = await userModel.findById(payload._id);
    if (!user) return done(null, false)
    return done(null, user);
});

exports.jwtAdminStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    console.log("jwtAdminStrategy", payload);
    const user = await userModel.findById(payload._id);
    if (!user || user.role !== 'admin') return done(null, false);
    return done(null, user);
});

exports.checkIsAuthAdmin = (req, res, next) => {
    passport.authenticate('jwtAdmin', { session: false })(req, res, next);
};

exports.checkIsAuth = (req, res, next) => {
    if (req.originalUrl.includes(process.env.API_PATH)){
        passport.authenticate('jwtUser', { session: false })(req, res, next)
    } else {
        next()
    }
}

