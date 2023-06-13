const Order = require('../models/orderModel');
const products = require('../models/productModel');
const expressAsyncHandler = require('express-async-handler');


const createOrder = expressAsyncHandler(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    if (!shippingInfo) {
        res.status(400);
        throw new Error("Something is missing in request, Try again.");
    }
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });
    if (!order) {
        res.status(400);
        throw new Error("Order not created, Try again.");
    };
    res.status(201).json({
        status: true,
        order: order,
    })
});

//Get logged in user all Orders.

const myOrder = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        res.status(400);
        throw new Error(`Order not found with this id: ${req.params.id}`);
    };
    res.status(200).json({
        success: true,
        orders: orders,
    });
});
// Get all orders for --Admin
const getAllOrders = expressAsyncHandler(async (req, res) => {
    //populate will gives us name and email by using only id of the user.
    const orders = await Order.find();

    if (!orders) {
        res.status(400);
        throw new Error(`Order not found with this id: ${req.params.id}`);
    };
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        totalAmount: totalAmount,
        orders: orders,
    });
});
//get order details for user
const getOrderDetails = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(400);
        throw new Error(`Order not found with this id: ${req.params.id}`);
    };
    res.status(200).json({
        success: true,
        order: order,
    });
});
//Get Single Order --admin
const singleOrder = expressAsyncHandler(async (req, res) => {
    //populate will gives us name and email by using only id of the user.
    const order = await Order.findOne({ _id: req.params.id }).populate(
        "user",
        "name email",
    );

    if (!order) {
        res.status(400);
        throw new Error(`Order not found with this id: ${req.params.id}`);
    };
    res.status(200).json({
        success: true,
        order: order,
    });
});
//delete an order --admin
const deleteOrder = expressAsyncHandler(async (req, res) => {
    //populate will gives us name and email by using only id of the user.
    const orders = await Order.findById(req.params.id);

    if (!orders) {
        res.status(400);
        throw new Error(`Order not found with this id: ${req.params.id}`);
    };
    await Order.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success: true,
        message: "Order Updated successfully"
    });
});
//update an order --admin
const updateOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    console.log("order", order, order.orderStatus, order.product, order.quantity);
    if (!order) {
        res.status(400);
        throw new Error(`Order not found with this id: ${req.params.id}`);
    };
    if (order.orderStatus === 'delivered') {
        res.status(400);
        throw new Error("Order already delivered");
    };
    //we need to calculate the remaining quantity of the product
    order.orderItems.forEach(async (order) => {
        await updateStock(order.productId, order.quantity);
    });
    //after this set the admin status 
    order.orderStatus = req.body.status;
    //set delivered time
    if (req.body.status === "delivered") {
        order.deliveredAt = Date.now();
    };
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Order Updated Successfully",
    });
});

const updateStock = async (id, quantity) => {
    const product = await products.findById({ _id: id });
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}


module.exports = {
    createOrder,
    singleOrder,
    myOrder,
    getAllOrders,
    deleteOrder,
    updateOrder,
    getOrderDetails,
}