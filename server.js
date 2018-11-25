//imports
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

//iniciando app
const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

//iniciando o db
mongoose.connect('mongodb://localhost:27017/apinode', { useNewUrlParser: true });
requireDir('./src/models/');

app.use('/api', require('./src/routes'));
app.listen(3001);
  