import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getUser = asyncHandler(async (req, res) => {
  const { email, name } = req.user;

  if (!email || !name) {
    throw new ApiError(400, "Please login First");
  }

  const user = await User.findOne({ email }).select(
    "-password -createdAt -updatedAt -refreshToken",
  );

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
  const { name, email, password, alternateEmail, alternatePhone, address } =
    req.body;

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

  res
    .status(200)
    .json(new ApiResponse(200, user, "Information updated successfully"));
});

const myOrders = asyncHandler(async (req, res) => {
  // Assuming req.user is attached by verifyJWT middleware
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Fetch orders by user id
  const orders = await Order.find({ user: user._id });

  if (!orders || orders.length === 0) {
    return res.status(400).json(
      new ApiResponse(400, null, "You haven't ordered anything yet")
    );
  }

  res.status(200).json(
    new ApiResponse(200, orders, "Orders fetched successfully")
  );
});


const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, conformPassword } = req.body;

  console.log("1")
  if (!oldPassword || !newPassword || !conformPassword) {
    throw new ApiError(400, "Both old new and conform passwords are required");
  }

    console.log("2")

 if(newPassword === conformPassword){
  console.log("new password and conform password is same")
 }
 
 console.log("3")
 
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }


  const isMatch = await user.isPasswordCorrect(oldPassword);
  if (!isMatch) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save(); 

  res.status(200).json(
    new ApiResponse(200, null, "Password changed successfully")
  );
});

export { getUser, UpdateprofileSettings, myOrders, changePassword };
