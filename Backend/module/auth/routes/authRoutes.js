import express from "express";
import { signupUser, loginUser, logoutUser } from "../controller/authController.js";
import {verifyToken} from "../../../middleware/authMiddleware.js"

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout",verifyToken,logoutUser)

export default router;
