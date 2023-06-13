const expressAsyncHandler = require("express-async-handler");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//process of payment throught stripe
const processPayment = expressAsyncHandler(async (req, res) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "pkr",
        metadata: {
            company: "Chic Choice Maven",
        },
    });
    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
    });
});

const sendStripeKey = expressAsyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_KEY,
    })
});

module.exports = { processPayment, sendStripeKey }