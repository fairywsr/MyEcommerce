import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(200, "Error in Auth Middleware");
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 
  const user = await User.findById(decodeToken?.id).select("-password -refreshToken")

    if (!user) {
      throw new ApiError(400, "Invalid Access Token");
    }
    req.user = user;
  
    next();
  } catch (error) {
    throw new ApiError(400, "Invalid access Token");
  }
});
