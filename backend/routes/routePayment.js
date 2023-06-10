const express = require('express');
const {processPayment, sendStripeKey} = require('../controllers/paymentController');

const router = express.Router();

const { isAuthenticated } = require('../middleware/authmiddleware');

router.route('/process/payment').post(isAuthenticated, processPayment);
router.route('/stripeApiKey').get(isAuthenticated, sendStripeKey);


module.exports = router;