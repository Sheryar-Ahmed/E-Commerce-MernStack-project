const express = require('express');
require('dotenv').config();
const product = require('./routes/routeProducts');
const users = require('./routes/routeUser');
const { errorHanlder } = require('./middleware/errormiddleware');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', product);
app.use('/api/v1', users);
app.use(errorHanlder);
module.exports = app;