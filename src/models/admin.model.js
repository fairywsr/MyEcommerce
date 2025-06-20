import mongoose from "mongoose";
import { AvailableUserRoleEnum, userRoleEnum } from "../constants";

const adminSchema = new mongoose.Schema({
   admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   },
   permissions:{
    type: String,
    enum: userRoleEnum,
    default: AvailableUserRoleEnum.USER,
   }
}, {timestamps: true})

export const Admin = mongoose.model("Admin", adminSchema)