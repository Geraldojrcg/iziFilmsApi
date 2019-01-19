const express = require('express');
const app = express(); 
var passport = require('passport');
var LocalStrategy = require('passport-local');
const db = require('./../models');

passport.use(new LocalStrategy(
    {usernameField:"email", passwordField:"password"},
    function(email, password, cb) {
        db.User.findAll({raw: true, where:{email:email}}).then((user) => {
            user = user[0];
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        }).catch((err) => {return cb(err)});
    }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.User.findAll({raw: true, where:{id: id}}).then((user) => {
        user = user[0];
        return cb(null, user);
    }).catch((err) => {return cb(err)});
});
