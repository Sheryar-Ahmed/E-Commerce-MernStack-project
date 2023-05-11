const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    //where to ship info
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Address is necessary."]
        },
        city: {
            type: String,
            required: [true, "City is necessary."]
        },
        state: {
            type: String,
            required: [true, "state is necessary."]
        },
        country: {
            type: String,
            required: [true, "country is necessary."]
        },
        pinCode: {
            type: Number,
            required: [true, "pincode is necessary."]
        },
        phoneNo: {
            type: Number,
            required: [true, "Cell No is necessary."]
        },
    },
    //order details for shipment of the product
    orderItems: [
        {
            name: {
                type: String,
                required: [true, "name is required."]
            },
            price: {
                type: Number,
                required: [true, "Price is required."]
            },
            quantity: {
                type: Number,
                required: [true, "quantity is required."]
            },
            image: {
                type: String,
                required: [true, "image is required"]
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'products',
                required: [true, 'Product Id cannot be empty']
            }
        }
    ],
    //user details 
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'User Id cannot be empty.']
    },
    // payment required
    paymentInfo: {
        id: {
            type: String,
            required: [true, 'Id is required for payment Information.']
        },
        status: {
            type: String,
            required: [true, 'Status is required']
        }
    },
    paidAt: {
        type: Date,
        required: true,
    },
    //below will be calculated at frontend
    itemsPrice: {
        type: Number,
        default: 0
    },
    taxPrice: {
        type: Number,
        default: 0
    },
    shippingPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: Date,

},
    {
        timestamps: true,
    }
);

const Order = mongoose.models?.orders || mongoose.model('orders', orderSchema);

module.exports = Order;