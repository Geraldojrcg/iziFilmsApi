//imports
const express = require('express');
const cors = require('cors');
const passport = require('passport');

//init app
const app = express();
app.use(express.json());
app.use(cors());

//authentication service
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
const flash = require('connect-flash');
app.use(flash());
//getting the passport configs
require('./src/authService');
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//using the routes of api
app.use('/api', require('./src/routes'));

//static routes for the upload dir
app.use('/capes', express.static(__dirname+'/uploads/'));

app.listen(3001);
  