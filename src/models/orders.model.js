import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        type: String,
        trim: true
    },
    paymentMethod: {
        type: String,
        trim: true
    },
    paymentResult: { // Add information about payment result
        id: { type: String },
        status: { type: String },
        update_time: { type: Date },
        email_address: { type: String }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    trackingNumber: {
        type: String
    }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema)
