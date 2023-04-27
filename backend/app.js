const express = require('express');
require('dotenv').config();
const product = require('./routes/routeProducts');
const {errorHandler} = require('./middleware/errormiddleware');

const app = express();

app.use(express.json());
app.use('/api/v1', product);
app.use(errorHandler)
module.exports = app;