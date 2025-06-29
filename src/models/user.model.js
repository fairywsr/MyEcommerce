import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRoleEnum } from "../constants.js";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    alternateEmail:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String
    },
    role:{
        type: String,
        enum: userRoleEnum,
        default: userRoleEnum.USER,
    },
    phone:{
        type: String,
        unique: true,
        required: true
    },
    alternatePhone:{
        type: String,
        unique: true,
    },
    refreshToken:{
      type: String,
    },
    resetPasswordToken:{
     type: String,
    },

    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }
}, {timestamps: true})



userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};
// userSchema.methods.generatePasswordResetToken = function () {
//     const token = crypto.randomBytes(32).toString("hex");
//     next();
// };

export const User = mongoose.model("User", userSchema)