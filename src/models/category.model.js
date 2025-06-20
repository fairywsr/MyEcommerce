import mongoose from "mongoose";
import { avilableEnumCategory, enumCategory } from "../constants";

const categorySchema = new mongoose.Schema({
      category:{
        type: String,
        enum: enumCategory,
        default: avilableEnumCategory.SUMMER,
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