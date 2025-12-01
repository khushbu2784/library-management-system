import User from "../../../database/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Codes from "../../../config/statusCodes.js";
import GLOBALS from "../../../config/constant.js";
import { handleError } from "../../../utils/errorHandler.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, GLOBALS.JWT_SECRET.trim(), {
    expiresIn: "7d",
  });
};

//Signup
export const signupModule = async (data) => {
  try {
    const { fullName, email, password, phoneNumber, role } = data;

    if (!fullName || !email || !password) {
      return {
        statusCode: Codes.BAD_REQUEST,
        message: "Full Name, Email & Password are required",
        data: null,
      };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        statusCode: Codes.DUPLICATES_VALUE,
        message: "User already exists!",
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role: role || "user",
    });

    newUser.password = undefined;

    return {
      statusCode: Codes.CREATED,
      message: "User registered successfully",
      data: { user: newUser },
    };
  } catch (error) {
    console.error("Signup Error:", error);
    handleError(error, "Signup Module Error");
  }
};

//Login
export const loginModule = async (data) => {
  try {
    const { email, password } = data;

    if (!email || !password) {
      return {
        statusCode: Codes.BAD_REQUEST,
        message: "Email & Password are required",
        data: null,
      };
    }

    const user = await User.findOne({ email }).select("+password");  
    if (!user)
      return {
        statusCode: Codes.NOT_FOUND,
        message: "User not found",
        data: null,
      };

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return {
        statusCode: Codes.UNAUTHORIZED,
        message: "Invalid credentials",
        data: null,
      };

    const token = generateToken(user);
    console.log(token);
    user.password = undefined;

    return {
      statusCode: Codes.SUCCESS,
      message: "Login successful",
      data: { user, token },
    };
  } catch (error) {
    console.error("Login Error:", error);
    handleError(error, "Login Module Error");
  }
};

//logout
export const logoutModule = async (userId) => {
  try {
    return {
      statusCode: Codes.SUCCESS,
      message: "Logout successful",
      data: null,
    };
  } catch (error) {
    console.error("Logout Error:", error);
    handleError(error, "Logout Module Error");
  }
};
