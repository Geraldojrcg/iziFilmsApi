//imports
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const path = require('path');


//iniciando app
const app = express();
app.use(express.json());
app.use(cors());

//iniciando o db
//mongoose.connect('mongodb://localhost:27017/apinode', { useNewUrlParser: true });
requireDir('./src/models/');

//usando as rotas
app.use('/api', require('./src/routes'));

//rota statica para a pasta uploads
app.use('/capes', express.static(__dirname+'/uploads/'));

app.listen(3001);
  