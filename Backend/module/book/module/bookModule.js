import Book from "../../../database/models/Book.js";
import Codes from "../../../config/statusCodes.js";
import { handleError } from "../../../utils/errorHandler.js";

// Get all books with filters
export const getAllBooksModule = async (filters) => {
  try {
    const query = {};
    if (filters.title) query.title = { $regex: filters.title, $options: "i" };
    if (filters.author) query.author = { $regex: filters.author, $options: "i" };
    if (filters.genre) query.genre = { $regex: filters.genre, $options: "i" };
    if (filters.isAvailable !== undefined && filters.isAvailable !== "") {
      query.isAvailable = filters.isAvailable === "true";
    }
    if (filters.year) {
      query.publicationYear = Number(filters.year);
    }
    const books = await Book.find(query).sort({ createdAt: -1 });

    return {
      statusCode: Codes.SUCCESS,
      message: "Books fetched successfully",
      data: { books },
    };
  } catch (error) {
    return handleError(error, "Get Books Module Error");
  }
};

// Add book
export const addBookModule = async (data) => {
  try {
    const newBook = await Book.create({ ...data, isAvailable: true });
    return {
      statusCode: Codes.CREATED,
      message: "Book added successfully",
      data: { book: newBook },
    };
  } catch (error) {
    return handleError(error, "Add Book Module Error");
  }
};

// Get single book
export const getSingleBookModule = async (id) => {
  try {
    const book = await Book.findById(id);

    if (!book)
      return {
        statusCode: Codes.NOT_FOUND,
        message: "Book not found",
        data: null,
      };

    return {
      statusCode: Codes.SUCCESS,
      message: "Book fetched successfully",
      data: { book },
    };
  } catch (error) {
    return handleError(error, "Get Single Book Module Error");
  }
};

// Update book
export const updateBookModule = async (id, data) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true });

    if (!updatedBook)
      return {
        statusCode: Codes.NOT_FOUND,
        message: "Book not found",
        data: null,
      };

    return {
      statusCode: Codes.SUCCESS,
      message: "Book updated successfully",
      data: { book: updatedBook },
    };
  } catch (error) {
    return handleError(error, "Update Book Module Error");
  }
};

// Delete book
export const deleteBookModule = async (id) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook)
      return {
        statusCode: Codes.NOT_FOUND,
        message: "Book not found",
        data: null,
      };

    return {
      statusCode: Codes.SUCCESS,
      message: "Book deleted successfully",
      data: null,
    };
  } catch (error) {
    return handleError(error, "Delete Book Module Error");
  }
};
