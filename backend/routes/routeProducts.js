const express = require('express');
const {
    getAllProduct,
    creatProduct,
    updateProduct,
    deleteProduct,
    productDetails
} = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getAllProduct);
router.route('/products/new').post(creatProduct);
router.route('/products/:id').put(updateProduct).delete(deleteProduct).get(productDetails);

module.exports = router;