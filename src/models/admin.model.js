import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
   admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   },
   permissions:{
    type: String,
    enum: ["Admin"]
   }
}, {timestamps: true})

export const Admin = mongoose.model("Admin", adminSchema)