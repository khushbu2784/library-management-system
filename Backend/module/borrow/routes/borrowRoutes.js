import express from "express";
import { verifyToken, verifyAdmin } from "../../../middleware/authMiddleware.js";
import {
  borrowBook,
  returnBook,
  getUserHistory,
  getOverdue,
  getBorrowById,
  adminGetAllHistory,
} from "../controller/borrowController.js";

const router = express.Router();

router.post("/", verifyToken, borrowBook);           
router.post("/return", verifyToken, returnBook);

router.get("/history", verifyToken, getUserHistory);

router.get("/admin/history", verifyToken, verifyAdmin, adminGetAllHistory);
router.get("/admin/overdue", verifyToken, verifyAdmin, getOverdue);
router.get("/admin/:borrowId", verifyToken, verifyAdmin, getBorrowById);

export default router;
