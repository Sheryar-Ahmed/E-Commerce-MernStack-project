const express = require('express');
const {
    getAllProduct,
    creatProduct,
    updateProduct,
    deleteProduct,
    productDetails
} = require('../controllers/productController');
const isAuthenticated = require('../middleware/authmiddleware');
const router = express.Router();

router.route('/products').get(getAllProduct);
router.route('/products/new').post(isAuthenticated, creatProduct);
router.route('/products/:id')
    .put(isAuthenticated, updateProduct)
    .delete(isAuthenticated, deleteProduct)
    .get(productDetails);

module.exports = router;