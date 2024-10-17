import jwt from "jsonwebtoken";
import { ApiError } from "../../utils/api_error.js";

// Authentication middleware
const authenticate = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token format

    if (!token) {
        throw new ApiError(401, "Access token is missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // Store user info in request for later use
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }
};


// Authorization middleware
const authorize = (requireAdmin = true) => {
    return (req, res, next) => {
        if (!req.user || (requireAdmin && !req.user.isAdmin)) {
            return next(new ApiError(403, "You do not have permission to perform this action"));
        }
        next();
    };
};




export {
    authenticate, authorize
};
