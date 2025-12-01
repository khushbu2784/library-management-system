import mongoose from "mongoose";
import GLOBALS from "../config/constant.js";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async()=>{
  try{
    await mongoose.connect(GLOBALS.MONGO_URI);
    console.log("MongoDB connected Successfully!");  
  }catch(error){
    console.error("Error while connecting to MongoDB",error);
  }
}

export default connectDb; 