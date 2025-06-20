import { dbConnect } from "../db/db.connect.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const registerUser = asyncHandler (async (req, res) => {
   
    const {email, password} = req.body
     console.log(email, password)
   if(!email && password){
    console.log("All field are required")
   }
    res.status(200).json({
        message: "Register User is working"
    })
})
export {registerUser}