import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
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
        type: Schema.Types.ObjectId,
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
