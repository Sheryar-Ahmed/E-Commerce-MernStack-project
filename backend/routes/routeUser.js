const express = require('express');
const { userRegistration, userLogin, logout, forgotPassword, resetPassword, getUserDetails } = require("../controllers/userController");
const { isAuthenticated } = require('../middleware/authmiddleware');

const router = express.Router();


router.route('/user').post(userRegistration);
router.route('/login').post(userLogin);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticated, getUserDetails);

module.exports = router;