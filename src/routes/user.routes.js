import Router from "express";
import {logInUser, logOutUser, registerUser, refreshAccessToken, forgetPassword} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUser, UpdateprofileSettings } from "../controllers/profile.controller.js";
const router = Router();


router.route("/register").post(registerUser)
router.route("/login").post(logInUser)
router.route("/logout").get(verifyJWT, logOutUser)
router.route("/refresh-token").post(refreshAccessToken);
router.route("/passwordReset").post(forgetPassword);  // untested route and controller 

// profile routes 
router.route("/profile").post(verifyJWT, getUser)
router.route("/profile/settings").post(verifyJWT, UpdateprofileSettings)


export default router;