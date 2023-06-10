const express = require('express');
const {
    createOrder,
    singleOrder,
    myOrder,
    deleteOrder,
    getAllOrders,
    updateOrder,
    getOrderDetails,
} = require('../controllers/orderController');
const { isAuthenticated, authorizeRole } = require('../middleware/authmiddleware');
const router = express.Router();

router.route('/order/new').post(isAuthenticated, createOrder);
router.route('/orders/me').get(isAuthenticated, myOrder);
router.route('/order/:id').get(isAuthenticated, getOrderDetails);

router.route('/admin/order/:id')
    .get(isAuthenticated, authorizeRole("admin"), singleOrder)
    .delete(isAuthenticated, authorizeRole("admin"), deleteOrder)
    .put(isAuthenticated, authorizeRole("admin"), updateOrder)
    ;
router.route('/admin/orders')
    .get(isAuthenticated, authorizeRole("admin"), getAllOrders)

module.exports = router;