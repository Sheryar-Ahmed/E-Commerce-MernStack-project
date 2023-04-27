const express = require('express');
const { userRegistration } = require("../controllers/userController");
const router = express.Router();


router.route('/user').post(userRegistration);

module.exports = router;