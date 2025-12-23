import express from "express";
import {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from "../controller/bookController.js";
import upload from "../../../middleware/multer.js";
import { verifyToken, verifyAdmin } from "../../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllBooks);
router.get("/:bookId", getBookById);

// Admin-only routes
// router.post("/admin/add", verifyToken, verifyAdmin, addBook);
// router.put("/admin/update/:bookId", verifyToken, verifyAdmin, updateBook);

router.post("/admin/add",verifyToken, verifyAdmin, upload.single("cover"), addBook);
router.put("/admin/update/:bookId", verifyToken, verifyAdmin,upload.single("cover"), updateBook);
router.delete("/admin/delete/:bookId", verifyToken, verifyAdmin, deleteBook);

export default router;
