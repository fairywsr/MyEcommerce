import Router from "express";
import {loginUser, registerUser} from "../controllers/user.controllers.js";
const router = Router();


router.route("/register").post(registerUser)
router.route("/login").get(loginUser)


export default router;