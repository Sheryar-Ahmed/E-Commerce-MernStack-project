const express = require('express');
const cors = require('cors');
require('dotenv').config();
const product = require('./routes/routeProducts');
const users = require('./routes/routeUser');
const orders = require('./routes/routeOrder');
const { errorHanlder } = require('./middleware/errormiddleware');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
app.use(cors());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

app.use('/api/v1', product);
app.use('/api/v1', users);
app.use('/api/v1', orders);
app.use(errorHanlder);
module.exports = app;