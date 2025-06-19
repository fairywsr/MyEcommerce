import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min:0,
    },
    discount:{
        type: String,
        default: 0,
        min:0,
        max:100
    },
    stock:{
        type: Number,
        default:0,
        min:0
    },
    images:{
        type: [String],
        default:[]
    },
    rating:{
        type: Number,
        default:0,
        min:0,
        max:5
    },
    numReviews:{
        type: Number,
        default:0
    }
}, {timestamps: true});


export const Product = mongoose.model("product", productSchema);