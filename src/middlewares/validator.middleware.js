import {validationResult} from "express-validator"
import {ApiError} from "../utils/ApiError.js"

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    // If there are no errors, proceed to the next middleware
    if(errors.isEmpty()){
        return next();
    }

    // If there are errors, format them and return an ApiError
    const extractError = [];
    errors.array().forEach((err) => {
        extractError.push({
            [err.path]: err.msg
        });
    });

    console.log(extractError);
    return next(new ApiError(422, "Received Data is not valid", extractError));
}
