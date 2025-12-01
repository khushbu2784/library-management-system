import dotenv from "dotenv";

dotenv.config();

const GLOBALS = {
  PORT: process.env.PORT,
  PORT_BASE_URL: process.env.PORT_BASE_URL,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASS: process.env.SMTP_PASS,
  KEY: process.env.KEY,
  IV: process.env.IV,
  APP_NAME:process.env.APP_NAME,
}

export default GLOBALS;