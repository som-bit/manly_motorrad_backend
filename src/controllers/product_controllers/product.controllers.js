import mongoose, { isValidObjectId } from "mongoose";
import { Product } from "../../models/product.models.js";
import { Categories } from "../../models/categories.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

// Get all products with pagination, sorting, and filtering
const getAllProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = 'desc', Categories } = req.query;

    const filter = {};
    if (query) {
        filter.name = { $regex: query, $options: 'i' };
    }
    if (Categories && isValidObjectId(Categories)) {
        filter.Categories = Categories;
    }

    const sort = {};
    if (sortBy) {
        sort[sortBy] = sortType === 'asc' ? 1 : -1;
    }

    const products = await Product.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json(new ApiResponse(true, 'Products retrieved successfully', {
        products,
        total,
        page: Number(page),
        limit: Number(limit)
    }));
});

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, category, price, stock, availability, rating, numReviews } = req.body;

    const requiredFields = {
        name: "Product name is required",
        category: "Category is required",
        price: "Price is required hello",
        stock: "Stock is required",
        availability: "Availability is required",
        rating: "Rating is required",
        numReviews: "Number of reviews is required",
        imagesLocalPath: "Image file is required"
    };

    // Check for missing fields
    for (const [key, message] of Object.entries(requiredFields)) {
        if (!eval(key)) {  // Using eval to dynamically check variable existence
            throw new ApiError(400, message);

        }
    }


    const imagesLocalPath = req.files?.images[0]?.path;

    if (!imagesLocalPath) {
        throw new ApiError(400, "Image file is required");
    }

    // Upload image to Cloudinary
    const cloudinaryResult = await uploadOnCloudinary(imagesLocalPath);

    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
        throw new ApiError(400, "Image upload failed");
    }

    // Extract the URL from Cloudinary result
    const images = [cloudinaryResult.secure_url];

    // Create new product
    const newProduct = await Product.create({
        name,
        description,
        category, // Ensure category is included
        price,
        stock,
        availability,
        rating,
        numReviews,
        images
    });

    const createdProduct = await Product.findById(newProduct._id).populate('category');

    if (!createdProduct) {
        throw new ApiError(500, "Something went wrong while creating the product");
    }

    return res.status(201).json(
        new ApiResponse(200, createdProduct, "Product registered successfully")
    );
});





// Get a product by ID
const getProductById = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
        throw new ApiError(400, 'Invalid product ID');
    }

    const product = await Product.findById(productId).populate('Categories').populate('reviews');

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    res.status(200).json(new ApiResponse(true, 'Product retrieved successfully', product));
});

// Update a product by ID
const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
        throw new ApiError(400, 'Invalid product ID');
    }

    const updates = req.body;
    if (req.files?.length > 0) {
        updates.images = req.files.map(file => file.path);
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

    if (!updatedProduct) {
        throw new ApiError(404, 'Product not found');
    }

    res.status(200).json(new ApiResponse(true, 'Product updated successfully', updatedProduct));
});

// Delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
        throw new ApiError(400, 'Invalid product ID');
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
        throw new ApiError(404, 'Product not found');
    }

    res.status(200).json(new ApiResponse(true, 'Product deleted successfully'));
});

// Toggle product availability
const toggleAvailability = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
        throw new ApiError(400, 'Invalid product ID');
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, 'Product not found');
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
