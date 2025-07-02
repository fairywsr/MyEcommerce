import Router from "express";
import {logInUser, logOutUser, registerUser, refreshAccessToken, forgetPassword} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { changePassword, getUser, myOrders, UpdateprofileSettings } from "../controllers/profile.controller.js";
import { loginValidator, registrationValidation } from "../validators/authValidators.js";
import { validate } from "../middlewares/validator.middleware.js";
const router = Router();


// aouth routes
router.route("/register").post(registrationValidation(), validate, registerUser)
router.route("/login").post(loginValidator(), validate, logInUser)
router.route("/logout").get(verifyJWT, logOutUser)
router.route("/refresh-token").post(refreshAccessToken);
router.route("/passwordReset").post(forgetPassword);  // untested route and controller 

// user profile routes 
router.route("/profile").post(verifyJWT, getUser)
router.route("/profile/settings").post(verifyJWT, UpdateprofileSettings)
router.route("/profile/myOrders").post(verifyJWT, myOrders)
router.route("/profile/changePassword").post(verifyJWT, changePassword)

// order route 
export default router;