const express = require('express');
const { userRegistration, userLogin, logout, forgotPassword } = require("../controllers/userController");
const router = express.Router();


router.route('/user').post(userRegistration);
router.route('/login').post(userLogin);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);

module.exports = router;