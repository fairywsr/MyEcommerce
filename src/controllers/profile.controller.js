import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"; 
 import {ApiError} from "../utils/ApiError.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";

const getUser = asyncHandler(async (req, res) => {
  const { email, name } = req.user;

  if (!email || !name) {
    throw new ApiError(400, "Please login First");
  }

  const user = await User.findOne({ email }).select("-password -createdAt -updatedAt -refreshToken",); 

  console.log(user);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    user,
  });
});

const UpdateprofileSettings = asyncHandler(async (req, res) => {
  const { name, email, password, alternateEmail, alternatePhone, address } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password; 
  if (alternateEmail) user.alternateEmail = alternateEmail;
  if (alternatePhone) user.alternatePhone = alternatePhone;
  if (address) user.address = address;

  await user.save();

  res.status(200).json(
    new ApiResponse(200, user, "Information updated successfully")
  );
});


export { getUser, UpdateprofileSettings };
