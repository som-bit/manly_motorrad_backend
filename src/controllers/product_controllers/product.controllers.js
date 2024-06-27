import mongoose, { isValidObjectId } from "mongoose";
import { Product } from "../../models/product.models.js";
import { Categories } from "../../models/categories.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";

// // Get all products with pagination, sorting, and filtering
// const getAllProducts = asyncHandler(async (req, res) => {
//     const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = 'desc', Categories } = req.query;

//     const filter = {};
//     if (query) {
//         filter.name = { $regex: query, $options: 'i' };
//     }
//     if (Categories && isValidObjectId(Categories)) {
//         filter.Categories = Categories;
//     }

//     const sort = {};
//     if (sortBy) {
//         sort[sortBy] = sortType === 'asc' ? 1 : -1;
//     }

//     const products = await Product.find(filter)
//         .sort(sort)
//         .skip((page - 1) * limit)
//         .limit(Number(limit));

//     const total = await Product.countDocuments(filter);

//     res.status(200).json(new ApiResponse(true, 'Products retrieved successfully', {
//         products,
//         total,
//         page: Number(page),
//         limit: Number(limit)
//     }));
// });

// Create a new product
// const createProduct = asyncHandler(async (req, res) => {
//     const { name, description, Categories, price, stock, availability, rating, numReviews } = req.body;
//     const images = req.files?.map(file => file.path);

//     if (!images || images.length === 0) {
//         throw new ApiError(400, 'Images are required');
//     }

//     const newProduct = new Product({
//         name,
//         description,
//         Categories,
//         price,
//         stock,
//         availability,
//         rating,
//         numReviews,
//         images
//     });

//     await newProduct.save();

//     res.status(201).json(new ApiResponse(true, 'Product created successfully', newProduct));
// });

// // Get a product by ID
// const getProductById = asyncHandler(async (req, res) => {
//     const { productId } = req.params;

//     if (!isValidObjectId(productId)) {
//         throw new ApiError(400, 'Invalid product ID');
//     }

//     const product = await Product.findById(productId).populate('Categories').populate('reviews');

//     if (!product) {
//         throw new ApiError(404, 'Product not found');
//     }

//     res.status(200).json(new ApiResponse(true, 'Product retrieved successfully', product));
// });

// // Update a product by ID
// const updateProduct = asyncHandler(async (req, res) => {
//     const { productId } = req.params;

//     if (!isValidObjectId(productId)) {
//         throw new ApiError(400, 'Invalid product ID');
//     }

//     const updates = req.body;
//     if (req.files?.length > 0) {
//         updates.images = req.files.map(file => file.path);
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

//     if (!updatedProduct) {
//         throw new ApiError(404, 'Product not found');
//     }

//     res.status(200).json(new ApiResponse(true, 'Product updated successfully', updatedProduct));
// });

// // Delete a product by ID
// const deleteProduct = asyncHandler(async (req, res) => {
//     const { productId } = req.params;

//     if (!isValidObjectId(productId)) {
//         throw new ApiError(400, 'Invalid product ID');
//     }

//     const deletedProduct = await Product.findByIdAndDelete(productId);

//     if (!deletedProduct) {
//         throw new ApiError(404, 'Product not found');
//     }

//     res.status(200).json(new ApiResponse(true, 'Product deleted successfully'));
// });

// // Toggle product availability
// const toggleAvailability = asyncHandler(async (req, res) => {
//     const { productId } = req.params;

//     if (!isValidObjectId(productId)) {
//         throw new ApiError(400, 'Invalid product ID');
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//         throw new ApiError(404, 'Product not found');
//     }

//     product.availability = !product.availability;
//     await product.save();

//     res.status(200).json(new ApiResponse(true, 'Product availability toggled successfully', product));
// });

export {
    // getAllProducts,
    // createProduct,
    // getProductById,
    // updateProduct,
    // deleteProduct,
    // toggleAvailability
};
