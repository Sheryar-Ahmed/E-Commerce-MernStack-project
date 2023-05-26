const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter the name of the product']
    },
    description: {
        type: String,
        required: [true, 'please enter the Description of the product']
    },
    price: {
        type: Number,
        required: [true, 'please enter the Price of the product'],
        maLength: [8, 'Price does not exceed 8 digits']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'please enter the Category of the product'],
    },
    stock: {
        type: Number,
        required: [true, 'please enter the stock of the product'],
        maxLength: [4, "Cannot exceed more than 4 digits"]
    },
    numOfReviews: {
        type: Number,
        default: 0
        //we don't need to require it
    },
    reviews: [
        {
            createdAt: {
                type: Date,
                default: Date.now()
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'users',
                required: [true, "Id cannot be empty"]
            },
            name: {
                type: String,
                required: [true, "Enter your name for Review"]
            },
            rating: {
                type: Number,
                required: [true, "Give rating to the product"]
            },
            comment: {
                type: String,
                required: [true, "Enter the comment for review"]
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: [true, "Id cannot be empty"]
    }
},
    {
        timestamps: true,
    }
);

const products = mongoose.models?.products || mongoose.model('products', productSchema)
module.exports = products;