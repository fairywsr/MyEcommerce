import mongoose from "mongoose";
import { db_Name } from "../constants.js";

const dbConnect= async () => {
     try {
        const connect = await mongoose.connect(`${process.env.MONGO_DB}/${db_Name}`)
        console.log("Mongo DB connect Successfully")
     } catch (error) {
        console.log("failed to connect MongoDb ", error)
        process.exit(1);
     }
}

export {dbConnect};