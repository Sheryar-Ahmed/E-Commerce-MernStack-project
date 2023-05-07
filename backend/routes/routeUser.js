const express = require('express');
const {
    userRegistration,
    userLogin,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile
} = require("../controllers/userController");
const { isAuthenticated } = require('../middleware/authmiddleware');

const router = express.Router();


router.route('/user').post(userRegistration);
router.route('/login').post(userLogin);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticated, getUserDetails);
router.route('/password/update').post(isAuthenticated, updatePassword);
router.route('/me/update').post(isAuthenticated, updateProfile);

module.exports = router;