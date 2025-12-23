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
import uploadToCloudinary from "../../../utils/uploadToCloudinary.js";

//create book
// export const addBook = async (req, res) => {
//   try {
//     const data = await decryption(req.body.data ? req.body.data : req.body);

//     const errors = validateCreateBook(data);
//     if (Object.keys(errors).length > 0) {
//       return sendResponse(res, Codes.BAD_REQUEST, "Validation Failed", errors);
//     }

//     const result = await addBookModule(data);
//     return sendResponse(res, result.statusCode, result.message, result.data);
//   } catch (error) {
//     handleError(error, "Create Book Controller Error");
//   }
// };
export const addBook = async (req, res) => {
  try {
      const data = req.body.data
      ? await decryption(req.body.data) // encrypted JSON
      : req.body;                       // FormData

    console.log("Parsed Data:", data);
    //await decryption(req.body.data ? req.body.data : req.body);
    console.log("Decrypted Data:", data);
    const errors = validateCreateBook(data);
    if (Object.keys(errors).length > 0) {
      return sendResponse(res, Codes.BAD_REQUEST, "Validation Failed", errors);
    }

    // 📸 upload cover image
    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype
      );
      data.coverImageUrl = uploadResult.secure_url;
    }

    const result = await addBookModule(data);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Add Book Controller Error");
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
  }
};

//update book
// export const updateBook = async (req, res) => {
//   try {
//     const decrypted = await decryption(req.body.data ? req.body.data : req.body);

//     const bookId = req.params.bookId;
//     console.log(bookId);
//     const errors = validateUpdateBook(decrypted);
//     if (Object.keys(errors).length > 0) {
//       return sendResponse(res, Codes.BAD_REQUEST, "Validation Failed", errors);
//     }

//     const result = await updateBookModule(bookId, decrypted);
//     return sendResponse(res, result.statusCode, result.message, result.data);
//   } catch (error) {
//     handleError(error, "Update Book Controller Error");
//   }
// };
export const updateBook = async (req, res) => {
  try {
     const data = req.body.data
      ? await decryption(req.body.data) // encrypted JSON
      : req.body;                       // FormData

    console.log("Parsed Data:", data);
    const { bookId } = req.params;

    const errors = validateUpdateBook(data);
    if (Object.keys(errors).length > 0) {
      return sendResponse(res, Codes.BAD_REQUEST, "Validation Failed", errors);
    }

    // 📸 upload new cover image if provided
    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype
      );
      data.coverImageUrl = uploadResult.secure_url;
    }

    const result = await updateBookModule(bookId, data);
    return sendResponse(res, result.statusCode, result.message, result.data);
  } catch (error) {
    handleError(error, "Update Book Controller Error");
    return sendResponse(res, Codes.INTERNAL_ERROR, "Internal Server Error");
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
