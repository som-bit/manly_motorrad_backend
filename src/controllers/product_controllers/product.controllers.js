import mongoose, { isValidObjectId } from "mongoose";
import { Product } from "../../models/product.models.js";
import { Categories } from "../../models/categories.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

// Get all products with pagination, sorting, and filtering
const getAllProducts = asyncHandler(async (req, res) => {
    // Destructure query parameters with default values
    const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = 'desc', Categories } = req.query;

    // Initialize an empty filter object to hold search criteria
    const filter = {};

    // If a search query is provided, filter products by name using regex (case-insensitive)
    if (query) {
        filter.name = { $regex: query, $options: 'i' };
    }

    // If a valid category ID is provided, filter products by category
    if (Categories && isValidObjectId(Categories)) {
        filter.category = Categories;
    }

    // Initialize the sorting object, defaulting to 'createdAt' in descending order
    const sort = {};
    if (sortBy) {
        sort[sortBy] = sortType === 'asc' ? 1 : -1; // Ascending or descending based on the query
    }

    // Fetch products from the database based on the filter and sort criteria
    // Pagination is applied by skipping and limiting the results
    const products = await Product.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)  // Skip items for pagination
        .limit(Number(limit));     // Limit the number of items returned

    // Count the total number of products matching the filter criteria
    const total = await Product.countDocuments(filter);

    // Respond with the products, total count, and pagination information
    res.status(200).json(new ApiResponse(true, 'Products retrieved successfully', {
        products,
        total,
        page: Number(page),   // Current page number
        limit: Number(limit)  // Limit per page
    }));
});








// Create a new product
const createProduct = asyncHandler(async (req, res, next) => {
    const { name, description, category, price, stock, availability, rating, numReviews } = req.body;

    // Check for missing fields
    const requiredFields = {
        name: "Product name is required",
        category: "Category is required",
        price: "Price is required",
        stock: "Stock is required",
        availability: "Availability is required",
        rating: "Rating is required",
        numReviews: "Number of reviews is required"
    };

    for (const [key, message] of Object.entries(requiredFields)) {
        if (!req.body[key]) {
            return next(new ApiError(400, message));
        }
    }

    // Check if image is uploaded
    const imagesLocalPath = req.files?.images?.[0]?.path;
    if (!imagesLocalPath) {
        return next(new ApiError(400, "Image file is required"));
    }

    // Upload image to Cloudinary
    const cloudinaryResult = await uploadOnCloudinary(imagesLocalPath);
    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
        return next(new ApiError(400, "Image upload failed"));
    }

    const images = [cloudinaryResult.secure_url];

    // Create new product
    const newProduct = await Product.create({
        name,
        description,
        category,
        price,
        stock,
        availability,
        rating,
        numReviews,
        images
    });

    const createdProduct = await Product.findById(newProduct._id).populate('category');

    if (!createdProduct) {
        return next(new ApiError(500, "Something went wrong while creating the product"));
    }

    return res.status(201).json(
        new ApiResponse(200, createdProduct, "Product registered successfully")
    );
});












// Get a product by ID
const getProductById = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
        return next(new ApiError(400, 'Invalid product ID'));
    }

    const product = await Product.findById(productId).populate('Categories').populate('reviews');

    if (!product) {
        return next(new ApiError(404, 'Product not found'));
    }

    res.status(200).json(new ApiResponse(true, 'Product retrieved successfully', product));
});

// Update a product by ID
const updateProduct = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
        return next(new ApiError(400, 'Invalid product ID'));
    }

    const updates = req.body;
    if (req.files?.length > 0) {
        updates.images = req.files.map(file => file.path);
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

    if (!updatedProduct) {
        return next(new ApiError(404, 'Product not found'));
    }

    res.status(200).json(new ApiResponse(true, 'Product updated successfully', updatedProduct));
});










const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;  // Use `id` instead of `productId`

    if (!isValidObjectId(id)) {
        return next(new ApiError(400, 'Invalid product ID'));
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        return next(new ApiError(404, 'Product not found'));
    }

    res.status(200).json(new ApiResponse(true, 'Product deleted successfully'));
});







// Toggle product availability
const toggleAvailability = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
        return next(new ApiError(400, 'Invalid product ID'));
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ApiError(404, 'Product not found'));
    }

    product.availability = !product.availability;
    await product.save();

    res.status(200).json(new ApiResponse(true, 'Product availability toggled successfully', product));
});

export {
    getAllProducts,
    createProduct,

    getProductById,
    updateProduct,
    deleteProduct,
    toggleAvailability
};
