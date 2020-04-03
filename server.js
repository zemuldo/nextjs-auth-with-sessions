const express = require('express');
const next = require('next');
const passport = require('passport')
const session = require("express-session");
const uid = require('uid-safe');
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {

  const server = express();

  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000
    },
    resave: false,
    saveUninitialized: true
  };

  server.use(bodyParser.json());

  server.use(session(sessionConfig));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  server.use(passport.initialize());
  server.use(passport.session());

  server.use('/auth', require('./api/auth'))

  server.get('/', (req, res, next) => {
    if(!req.isAuthenticated()) return res.redirect('/login')
    next();
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.info(`> Ready on http://localhost:${3000}`);
  });

});