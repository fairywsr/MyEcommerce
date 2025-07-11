import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"; 
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mail.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      200,
      "Error while creating access Token and refresh token ",
      error,
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, phone } = req.body;

  if (!email || !password || !name || !phone) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User Already Exist");
  }

  const user = await User.create({
    email,
    password,
    phone,
    name,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  console.log(createdUser);

  if (!createdUser) {
    throw new ApiError(500, "Error while creating user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "user Successfully created"));
});

const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(200, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(200, "User Not found");
  }

  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new ApiError(400, "Password Incorrect");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loginUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loginUser, "User login successfully"));
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "", // Using null instead of undefined
      },
    },
    {
      new: true,
    },
  );

  console.log(req.user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const inCommingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
 
  if (!inCommingRefreshToken) {
    throw new ApiError(401, "UnAuthorized Request");
  }

  try {
    const decodedToken = jwt.verify(
      inCommingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
   console.log(decodedToken);
    const user = await User.findById(decodedToken?.id);

    if (!user) {
      throw new ApiError(401, "invalid refresh Token");
    }

    if (inCommingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user.id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Accress Token refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid RefreshToken");
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }); 

  if (!user) {
    throw new ApiError(400, "Incorrect Email");
  }


  const resetPasswordToken = user.generatePasswordResetToken(); 
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;

  
  const mailOptions = {
    email,
    subject: "Reset your password",
    mailGenContent: forgetPasswordMailGenContent(user.name, resetUrl),
  };

 
  try {
    await sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: `Reset password email sent to ${email}`,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new ApiError(500, "Email could not be sent");
  }

  return res.status(500).json(
    new ApiResponse(500, {}, "Password reset successfully")
  )
});



export {
  registerUser,
  logInUser,
  logOutUser,
  forgetPassword,
  refreshAccessToken,
};
