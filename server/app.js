const express = require('express');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

require('dotenv').config()
mongoose.connect('mongodb://reynaldi:12345@ds123919.mlab.com:23919/overflow8')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use('/', index);

module.exports = app;
