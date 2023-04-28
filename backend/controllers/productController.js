const asyncHandler = require('express-async-handler');
const ApiFeatures = require('../utils/apifeatures');
const products = require('../models/productModel');



// @ get AllProducts 
// @ Public
// @ route  GET api/v1/products
// @ apiFeature search, filter, pagination, price range etc 
const getAllProduct = asyncHandler(async (req, res) => {
    const documentsPerPage = 5;
    const apiFeature = new ApiFeatures(products.find(), req.query)
        .search()
        .filterByCategory()
        .filterByPrice()
        .pagination(documentsPerPage);
    // const productsAll = await products.find();
    res.status(200).json(await apiFeature.query)

});
// @ Product Details 
// @ Public
// @ route  GET api/v1/products/:ID 
const productDetails = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        throw new Error("Enter the Id for updation");
    }
    const product = await products.findById(req.params.id);
    if (!product) {
        res.status(400)
        throw new Error(`Product details are not available  `)
    }

    res.status(200).json({ success: true, product });

});
// @ Create New Product 
// @ ADMIN
// @ route  POST api/v1/products 
const creatProduct = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new Error("Enter the key, pairs");
    }
    req.body.user = req.user.id;
    const setProduct = await products.create(req.body);
    setProduct ? res.status(201).json({ success: true, setProduct }) : res.status(400)

});
// @ Update Product 
// @ ADMIN
// @ route  POST api/v1/products/:ID 
const updateProduct = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        throw new Error("Enter the Id for updation");
    }
    const updatedProduct = await products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    updatedProduct ? res.status(200).json({ success: true, updatedProduct }) : res.status(400)

});
// @ Del Product 
// @ ADMIN
// @ route  POST api/v1/products/:ID 
const deleteProduct = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        throw new Error("Enter the Id for updation");
    }
    const product = await products.findByIdAndRemove(req.params.id);
    if (!product) {
        res.status(400)
        throw new Error(`Product not found`)
    }

    res.status(200).json({ success: true, message: "Product removed successfully" })

});


module.exports = {
    getAllProduct,
    productDetails,
    creatProduct,
    updateProduct,
    deleteProduct,
};