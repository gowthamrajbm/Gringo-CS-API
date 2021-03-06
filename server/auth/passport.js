const  mongoose = require('mongoose'),
    User = mongoose.model('user'),
    config = require('../config/config'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("user", jwt_payload)
        User.findById(jwt_payload.id)
            .then(user =>{
                if(user){
                    return done(null, user)
                }
                return done(null, false)
            }).catch(err => console.log(err));
    }))
}