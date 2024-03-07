import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [
        {
            type: String,
            trim: true,
            required:true
        }
    ],
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    availability: {
        type: Boolean,
        default: true,
        required:true
    },
    rating: { // New field for product rating
        type: Number,
        default: 0
    },
    numReviews: { // New field for number of reviews
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, { timestamps: true });

export const Product = mongoose.model("Product", categorySchema)
