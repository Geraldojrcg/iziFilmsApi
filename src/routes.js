const express = require('express');
const routes = express.Router();
const passport = require('passport');
const FilmController = require('./controllers/filmController');
const UserController = require('./controllers/userController');
const upload = require('./controllers/upload');

//function to protect the routes
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else{
    return res.json({error: "You have not permission for the acess this router, please do login!"});
  }
}

//Films Endpoints
routes.get('/films', FilmController.index);
routes.get('/films/:id', FilmController.show);
routes.post('/films', ensureAuthenticated, upload, FilmController.store);
routes.put('/films/:id', ensureAuthenticated, upload, FilmController.update);
routes.delete('/films/:id', ensureAuthenticated, FilmController.delete);

//User Endpoints
routes.get('/users', ensureAuthenticated, UserController.index);
routes.get('/users/:id', ensureAuthenticated, UserController.show);
routes.post('/users', ensureAuthenticated, UserController.store);
routes.put('/users/:id', ensureAuthenticated, UserController.update);
routes.delete('/users/:id', ensureAuthenticated, UserController.delete);

//Auth Endpoints
routes.post('/login', 
  passport.authenticate('local'),
  function(req, res) {
    res.json({status: "Loged-in"});
  });
  
routes.get('/logout',
  function(req, res){
    req.logout();
    res.json({status: "Loged-off"});
  });

module.exports = routes;