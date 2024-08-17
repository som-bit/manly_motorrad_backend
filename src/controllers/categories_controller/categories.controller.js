
import { Categories } from "../../models/categories.model.js";
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";





// Create a new category
const createCategory = asyncHandler(async (req, res) => {
    const { name, description, parentCategory } = req.body;

    // Check if category name already exists
    const existingCategory = await Categories.findOne({ name });
    if (existingCategory) {
        throw new ApiError(400, "Category with this name already exists");
    }

    // Create new category
    const newCategory = await Categories.create({
        name,
        description,
        parentCategory: parentCategory || null // Set to null if no parent category
    });

    const createdCategory = await Categories.findById(newCategory._id).populate('parentCategory');

    if (!createdCategory) {
        throw new ApiError(500, "Something went wrong while creating the category");
    }

    return res.status(201).json(
        new ApiResponse(200, createdCategory, "Category created successfully")
    );
});


export { createCategory };