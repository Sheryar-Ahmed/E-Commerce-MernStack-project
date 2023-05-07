const express = require('express');
const { userRegistration, userLogin, logout, forgotPassword, resetPassword } = require("../controllers/userController");
const router = express.Router();


router.route('/user').post(userRegistration);
router.route('/login').post(userLogin);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

module.exports = router;