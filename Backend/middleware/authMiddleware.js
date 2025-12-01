import jwt from "jsonwebtoken";
import Codes from "../config/statusCodes.js";
import GLOBALS from "../config/constant.js";

//Verify User Token
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(Codes.UNAUTHORIZED).json({
        statusCode: Codes.UNAUTHORIZED,
        message: "No token provided",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, GLOBALS.JWT_SECRET.trim(), (err, decoded) => {
      if (err) {
        return res.status(Codes.UNAUTHORIZED).json({
          statusCode: Codes.UNAUTHORIZED,
          message: "Token verification failed",
          data: null,
        });
      }

      req.user = decoded; 
      next();
    });
  } catch {
    return res.status(Codes.INTERNAL_ERROR).json({
      statusCode: Codes.INTERNAL_ERROR,
      message: "Internal Server Error",
      data: null,
    });
  }
};

//Verify Admin Role
export const verifyAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(Codes.UNAUTHORIZED).json({
        statusCode: Codes.UNAUTHORIZED,
        message: "User not authenticated",
        data: null,
      });
    }

    if (req.user.role !== "admin") {
      return res.status(Codes.FORBIDDEN).json({
        statusCode: Codes.FORBIDDEN,
        message: "Admin access required",
        data: null,
      });
    }

    next();
  } catch {
    return res.status(Codes.INTERNAL_ERROR).json({
      statusCode: Codes.INTERNAL_ERROR,
      message: "Internal Server Error",
      data: null,
    });
  }
};
