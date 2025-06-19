import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
      category:{
        type: String,
        enum: ["winter", "summer"],
        required: true
      },
      slug:{
        type: String,
        required: true
      },
      description:{
        type: String
      }



}, {timestamps: true});



export const Category = mongoose.model("Category", categorySchema)