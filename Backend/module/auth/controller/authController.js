import { sendResponse, decryption } from "../../../middleware/headerValidator.js";
import Codes from "../../../config/statusCodes.js";
import { signupModule, loginModule ,logoutModule, getAllUsersModule} from "../module/authModule.js";
import { validateLogin, validateSignup } from "../authValidation.js"
import { handleError } from "../../../utils/errorHandler.js";

export const signupUser = async (req, res) => {
  try {
    const data = await decryption(req.body.data ? req.body.data : req.body);

    const errors = validateSignup(data);
    if (Object.keys(errors).length > 0) {
      return sendResponse(res, Codes.BAD_REQUEST, "Validation Failed", errors);
    }

    const result = await signupModule(data);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const data = await decryption(req.body.data ? req.body.data : req.body);

    const errors = validateLogin(data);
    if (Object.keys(errors).length > 0) {
      return sendResponse(res, Codes.BAD_REQUEST, "Validation Failed", errors);
    }
    
    const result = await loginModule(data);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
  }
};

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await logoutModule(userId);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Logout Controller");
  }
};

export const getallUsers = async (req, res) => {
  try {
    const users = await getAllUsersModule();
    return sendResponse(res, Codes.SUCCESS, "Users retrieved successfully", users);
  } catch (error) {
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
  }
};