const expressAsyncHandler = require('express-async-handler');
const ApiFeatures = require('../utils/apifeatures');
const products = require('../models/productModel');



// @ get AllProducts 
// @ Public
// @ route  GET api/v1/products
// @ apiFeature search, filter, pagination, price range etc 
const getAllProduct = expressAsyncHandler(async (req, res) => {
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
const productDetails = expressAsyncHandler(async (req, res) => {
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
const creatProduct = expressAsyncHandler(async (req, res) => {
    if (!req.body) {
        throw new Error("Enter the key, pairs");
    }
    // passing usr id to the body;
    req.body.user = req.user.id;
    const setProduct = await products.create(req.body);
    setProduct ? res.status(201).json({ success: true, setProduct }) : res.status(400)

});
// @ Update Product 
// @ ADMIN
// @ route  POST api/v1/products/:ID 
const updateProduct = expressAsyncHandler(async (req, res) => {
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
const deleteProduct = expressAsyncHandler(async (req, res) => {
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
//create reviews or update the existed reviews;
const createProductReview = expressAsyncHandler(async (req, res) => {
    const { name, rating, comment, productId } = req.body;
    if (!name || !rating || !comment || !productId) {
        res.status(400);
        throw new Error("keys are not valid");
    };
    const review = {
        user: req.user._id,
        name: name,
        rating: Number(rating),
        comment
    };
    //find product 
    const product = await products.findById(productId);
    if (!product) {
        res.status(400);
        throw new Error("Product not found with your id.");
    };
    //req.user._id is an string also same like req.user.id
    const isReviewed = await product.reviews.find(rev => (rev.user.toString()) === (req.user._id.toString()));
    if (isReviewed) {
        //find that user and update its values
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        //simply push the review in the product.review array
        product.reviews.push(review);
        //noOfReviews 
        product.numOfReviews = product.reviews.length
    };

    //ratings are our average
    let ratingSum = 0;
    let avg;
    product.reviews.forEach((rev) => {
        ratingSum += rev.rating;
    });
    console.log('rating', ratingSum);
    avg = ratingSum / product.numOfReviews;
    //setting the avg
    product.ratings = avg;

    await product.save();

    res.status(201).json({
        success: true,
        message: "review Added Successfully."
    });
});
// get all reviews of a product 
const getAllReviews = expressAsyncHandler(async (req, res) => {
    const productId = req.query.id;
    const product = await products.findById({ _id: productId });
    if (!product) {
        res.status(400);
        throw new Error(`Product not found with this id: ${req.query.id}`);
    };
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});



module.exports = {
    getAllProduct,
    productDetails,
    creatProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getAllReviews
};