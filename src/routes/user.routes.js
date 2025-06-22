import Router from "express";
import {logInUser, logOutUser, registerUser} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();


router.route("/register").post(registerUser)
router.route("/login").get(logInUser)
router.route("/logout").get(verifyJWT, logOutUser)

export default router;