import { sendResponse, decryption } from "../../../middleware/headerValidator.js";
import Codes from "../../../config/statusCodes.js";
import {
  addBookModule,
  updateBookModule,
  deleteBookModule,
  getAllBooksModule,
  getSingleBookModule
} from "../module/bookModule.js";
import {
  validateCreateBook,
  validateUpdateBook,
} from "../bookValidation.js"
import { handleError } from "../../../utils/errorHandler.js";


//create book
export const addBook = async (req, res) => {
  try {
    const data = await decryption(req.body.data ? req.body.data : req.body);

    const errors = validateCreateBook(data);
    if (Object.keys(errors).length > 0) {
      return sendResponse(res, Codes.BAD_REQUEST, "Validation Failed", errors);
    }

    const result = await addBookModule(data);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Create Book Controller Error");
  }
};


//update book
export const updateBook = async (req, res) => {
  try {
    const decrypted = await decryption(req.body.data ? req.body.data : req.body);

    const bookId = req.params.bookId;
    console.log(bookId);
    const errors = validateUpdateBook(decrypted);
    if (Object.keys(errors).length > 0) {
      return sendResponse(res, Codes.BAD_REQUEST, "Validation Failed", errors);
    }

    const result = await updateBookModule(bookId, decrypted);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Update Book Controller Error");
  }
};


//delete book
export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const result = await deleteBookModule(bookId);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Delete Book Controller Error");
  }
};


//get all books
export const getAllBooks = async (req, res) => {
  try {
    const result = await getAllBooksModule(req.query);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Get All Books Controller Error");
  }
};

//get book by id
export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const result = await getSingleBookModule(bookId);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Get Book Controller Error");
  }
};
