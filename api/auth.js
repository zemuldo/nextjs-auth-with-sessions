const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const router = express()

const users = [{ name: "Test User", password: "password", user_name: "zemuldo" }]

const validateUser = async (username, password, done) => {
    const user = await  users.find(u => u.user_name == username)
    if (!user) { return done(null, false); }
    return done(null, user);
}

passport.use(new LocalStrategy(validateUser));

router.post('/login', (req, res, next) => {
    passport.authenticate('local',
        (err, user) => {
            if (err) {
                return res.status(400).send({ error: err })
            }

            if (!user) {
                return res.status(400).send({ error: "Login failed" });
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                return res.send({ status: "ok" });
            });

        })(req, res, next);
});

router.post('/logout', function(req, res){
    req.logout();
    res.send("ok");
  });

module.exports = router;