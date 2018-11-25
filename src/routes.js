const express = require('express');
const routes = express.Router();

const FilmController = require('./controllers/filmController');
const UserController = require('./controllers/userController');
const upload = require('./controllers/upload');

//rotas da api FILMES
routes.get('/films', FilmController.index);
routes.get('/films/:id', FilmController.show);
routes.post('/films', upload, FilmController.store);
routes.put('/films/:id', upload, FilmController.update);
routes.delete('/films/:id', FilmController.delete);

routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

module.exports = routes;