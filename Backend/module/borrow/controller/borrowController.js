import { sendResponse, decryption } from "../../../middleware/headerValidator.js";
import Codes from "../../../config/statusCodes.js";
import {
  borrowBookModule,
  returnBookModule,
  getUserBorrowHistoryModule,
  getOverdueModule,
  getBorrowByIdModule,
  getAllBorrowModule
} from "../module/borrowModule.js";
import { validateReturn } from "../borrowValidation.js";
import { handleError } from "../../../utils/errorHandler.js";

//Borrow a book 
export const borrowBook = async (req, res) => {
  try {
    const data = await decryption(req.body.data ? req.body.data : req.body);
    data.userId = req.user.id;

    const result = await borrowBookModule(data);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Borrow Controller Error");
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
  }
};

// Return a book 
export const returnBook = async (req, res) => {
  try {
    const data = await decryption(req.body.data ? req.body.data : req.body);
    data.userId = req.user.id;

    const errors = validateReturn(data);
    if (Object.keys(errors).length > 0)
      return sendResponse(res, Codes.BAD_REQUEST, "Validation Failed", errors);

    const result = await returnBookModule(data);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Return Controller Error");
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
  }
};

// User Borrow History 
export const getUserHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await getUserBorrowHistoryModule(userId);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Get User History Controller Error");
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
  }
};

//Overdue list 
export const getOverdue = async (req, res) => {
  try {
    const result = await getOverdueModule();
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Get Overdue Controller Error");
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
  }
};

//Get single borrow record 
export const getBorrowById = async (req, res) => {
  try {
    const id = req.params.borrowId;
    const result = await getBorrowByIdModule(id);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Get Borrow By Id Controller Error");
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
  }
};

export const adminGetAllHistory = async (req, res) => {
  try {
    const result = await getAllBorrowModule();
    return sendResponse(res, result.statusCode, result.message, result.data);
  }
  catch (error) {
    handleError(error, "Admin Get All History Controller Error");
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
  }
};