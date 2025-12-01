import express from "express";
import cors from "cors";

import connectDb from "./database/db.js"
import GLOBALS from "./config/constant.js";

import authRoutes from "./module/auth/routes/authRoutes.js"
import bookRoutes from "./module/book/routes/bookRoutes.js"
import borrowRoutes from "./module/borrow/routes/borrowRoutes.js"

const app = express();
const PORT = GLOBALS.PORT;

connectDb();

app.use(cors({
  origin: ["http://localhost:3000"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.text());

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/book',bookRoutes);
app.use('/api/v1/borrow',borrowRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})