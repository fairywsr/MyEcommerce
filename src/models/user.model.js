import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    phone:{
        type: String,
        unique: true,
        required: true
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }
}, {timestamps: true})


export const User = mongoose.model("User", UserSchema)