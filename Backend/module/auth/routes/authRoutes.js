import express from "express";
import { signupUser, loginUser, logoutUser, getallUsers } from "../controller/authController.js";
import {verifyAdmin, verifyToken} from "../../../middleware/authMiddleware.js"

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout",verifyToken,logoutUser)

router.get("/admin/getallusers", verifyToken, verifyAdmin,getallUsers);

export default router;
