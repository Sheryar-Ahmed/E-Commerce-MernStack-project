const express = require('express');
const { userRegistration, userLogin } = require("../controllers/userController");
const router = express.Router();


router.route('/user').post(userRegistration);
router.route('/login').post(userLogin);

module.exports = router;