import { User } from "../../models/user.model.js"; // Adjust the import path as necessary
import { ApiError } from "../../utils/api_error.js";
import { ApiResponse } from "../../utils/api_response.js";
import { asyncHandler } from "../../utils/async_handler.js";

// Create a new user
const createUser = asyncHandler(async (req, res, ) => {
    const { username, fullname, email, password, phone, address } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return new ApiError(400, "Username or email already exists");
    }

    // Create new user
    const newUser = await User.create({
        username,
        fullname,
        email,
        password, // Password will be hashed in the pre-save hook
        phone,
        address,
    });

    res.status(201).json(new ApiResponse(true, "User created successfully", newUser));
});

const login = asyncHandler(async (req, res, ) => {
    const { loginField, password } = req.body; // Renamed to loginField for clarity

    // Find user by either username or email
    const user = await User.findOne({
        $or: [
            { username: loginField }, // Check username
            { email: loginField }      // Check email
        ]
    }).select("+password"); // Include password for verification

    if (!user || !(await user.isPasswordCorrect(password))) {
        return new ApiError(401, "Invalid username or password");
    }

    // Generate access and refresh tokens
    const accessToken = user.generateAccesstoken();
    const refreshToken = user.generateRefreashToken();

    // Save refresh token in user document
    user.refreashtoken = refreshToken;
    await user.save();

    res.status(200).json(new ApiResponse(true, "Login successful", { accessToken, refreshToken }));
});



export {
    createUser, login
};
