const express = require('express');
const {
    getAllProduct,
    creatProduct,
    updateProduct,
    deleteProduct,
    productDetails,
    createProductReview,
    getAllReviews,
    deleteProductReview,
    getAllProductsAdmin
} = require('../controllers/productController');
const { isAuthenticated, authorizeRole } = require('../middleware/authmiddleware');
const router = express.Router();

router.route('/products').get(getAllProduct);
router.route('/admin/products').get(isAuthenticated, authorizeRole("admin"), getAllProductsAdmin);

router.route('/products/new').post(isAuthenticated, authorizeRole("admin"), creatProduct);
router.route('/products/:id')
    .put(isAuthenticated, authorizeRole("admin"), updateProduct)
    .delete(isAuthenticated, authorizeRole("admin"), deleteProduct)
    .get(productDetails);
router.route('/review')
    .post(isAuthenticated, createProductReview)
    .get(getAllReviews)
    .delete(isAuthenticated, authorizeRole("admin"), deleteProductReview);

module.exports = router;