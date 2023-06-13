const express = require('express');
const {
    userRegistration,
    userLogin,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateRole,
    deleteUser
} = require("../controllers/userController");
const { isAuthenticated, authorizeRole } = require('../middleware/authmiddleware');

const router = express.Router();


router.route('/user').post(userRegistration);
router.route('/login').post(userLogin);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticated, getUserDetails);
router.route('/password/update').post(isAuthenticated, updatePassword);
router.route('/me/update').put(isAuthenticated, updateProfile);
router.route('/admin/users').get(isAuthenticated, authorizeRole("admin"), getAllUsers);
router.route('/admin/user/:id')
    .get(isAuthenticated, authorizeRole("admin"), getSingleUser)
    .put(isAuthenticated, authorizeRole("admin"), updateRole)
    .delete(isAuthenticated, authorizeRole("admin"), deleteUser);


module.exports = router;