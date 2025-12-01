import Codes from "../config/statusCodes.js";

export const handleError = (error, location = "") => {
  console.error(`Error at ${location}:`, error);
  return {
    statusCode: Codes.INTERNAL_ERROR,
    message: "Internal Server Error",
    data: null,
  };
};
