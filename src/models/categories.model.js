import mongoose from 'mongoose'; // Using import syntax

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        default: null
    },
    subcategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories'
        }
    ]
}, { timestamps: true });

export const Categories = mongoose.model("Categories", categorySchema)
