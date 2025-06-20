import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser = asyncHandler (async (req, res) => {
     const {email, password, name, phone} = req.body

    if (!email || !password || !name || !phone) {
     throw new ApiError(400, "All fields are required");
}
     
     const existingUser = await User.findOne({email})
     if(existingUser){
        throw new ApiError(409, "User Already Exist")
     }

    const user =  await  User.create({
        email,
        password,
        phone,
        name
      })

      const createdUser = await User.findById(user._id).select("-password");
      console.log(createdUser)

      if(!createdUser){
        throw new ApiError(500, "Error while creating user")
      }

     return res.status(201).json(
        new ApiResponse(201, createdUser, "user Successfully created")
      )
}) ;
export {registerUser}