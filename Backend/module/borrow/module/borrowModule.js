import Borrow from "../../../database/models/Borrow.js";
import Book from "../../../database/models/Book.js";
import Codes from "../../../config/statusCodes.js";
import { handleError } from "../../../utils/errorHandler.js";

//borrow book
// export const borrowBookModule = async ({ userId, bookId }) => {
//   try {
//     const book = await Book.findById(bookId);
//     if (!book) {
//       return { statusCode: Codes.NOT_FOUND, message: "Book not found", data: null };
//     }

//     if (!book.isAvailable) {
//       return { statusCode: Codes.CONFLICT, message: "Book is not available", data: null };
//     }

//     // AUTO-GENERATE due date (14 days from now)
//     const borrowedDate = new Date();
//     const dueDate = new Date();
//     dueDate.setDate(dueDate.getDate() + 7);

//     const borrow = await Borrow.create({
//       userId,
//       bookId,
//       borrowedDate,
//       dueDate,
//       status: "borrowed",
//     });

//     // update book availability
//     book.isAvailable = false;
//     book.borrowedBy = userId;
//     await book.save();

//     return { statusCode: Codes.CREATED, message: "Book borrowed successfully", data: { borrow } };
//   } catch (error) {
//     return handleError(error, "Borrow Book Module Error");
//   }
// };
export const borrowBookModule = async ({ userId, bookId }) => {
  try {
    // Check duplicate borrow
    const existingBorrow = await Borrow.findOne({
      userId,
      bookId,
      status: "borrowed",
    });

    if (existingBorrow) {
      return {
        statusCode: Codes.CONFLICT,
        message: "You have already borrowed this book",
        data: null,
      };
    }

    // Atomic book lock
    const book = await Book.findOneAndUpdate(
      { _id: bookId, isAvailable: true },
      { isAvailable: false, borrowedBy: userId },
      { new: true }
    );

    if (!book) {
      return {
        statusCode: Codes.CONFLICT,
        message: "Book is not available",
        data: null,
      };
    }

    const borrowedDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const borrow = await Borrow.create({
      userId,
      bookId,
      borrowedDate,
      dueDate,
      status: "borrowed",
    });

    return {
      statusCode: Codes.CREATED,
      message: "Book borrowed successfully",
      data: { borrow },
    };
  } catch (error) {
    return handleError(error, "Borrow Book Module Error");
  }
};


//RETURN BOOK
export const returnBookModule = async ({ userId, bookId }) => {
  try {
    const borrow = await Borrow.findOne({ userId, bookId, status: "borrowed" });
    if (!borrow) {
      return { statusCode: Codes.NOT_FOUND, message: "No active borrow record found", data: null };
    }

    borrow.returnedDate = new Date();
    borrow.status = "returned";
    await borrow.save();

    const book = await Book.findById(bookId);
    if (book) {
      book.isAvailable = true;
      book.borrowedBy = null;
      await book.save();
    }

    return { statusCode: Codes.SUCCESS, message: "Book returned successfully", data: { borrow } };
  } catch (error) {
    return handleError(error, "Return Book Module Error");
  }
};

//user borrow history
export const getUserBorrowHistoryModule = async (userId) => {
  try {
    const history = await Borrow.find({ userId })
      .populate("bookId", "title author genre coverImageUrl")
      .sort({ createdAt: -1 });

    return { statusCode: Codes.SUCCESS, message: "History fetched", data: { history } };
  } catch (error) {
    return handleError(error, "Get Borrow History Module Error");
  }
};

//overdue list
export const getOverdueModule = async () => {
  try {
    const now = new Date();

    const overdue = await Borrow.find({
      status: "borrowed",
      dueDate: { $lt: now },
    })
      .populate("bookId", "title author")
      .populate("userId", "fullName email");

    if (overdue.length === 0) {
      return {
        statusCode: Codes.NOT_FOUND,
        message: "No overdue books",
      };
    }

    await Borrow.updateMany(
      { _id: { $in: overdue.map((b) => b._id) } },
      { $set: { status: "overdue" } }
    );

    return {
      statusCode: Codes.SUCCESS,
      message: "Overdue books fetched successfully",
      data: { overdue },
    };
  } catch (error) {
    return handleError(error, "Get Overdue Module Error");
  }
};

export const getBorrowByIdModule = async (id) => {
  try {
    const borrow = await Borrow.findById(id).populate("bookId userId", "title fullName email");

    if (!borrow)
      return { statusCode: Codes.NOT_FOUND, message: "Borrow record not found", data: null };

    return { statusCode: Codes.SUCCESS, message: "Record fetched", data: { borrow } };
  } catch (error) {
    return handleError(error, "Get Borrow By Id Module Error");
  }
};

export const getAllBorrowModule = async () => {
  try {
    const history = await Borrow.find()
      .populate("bookId", "title author genre coverImageUrl")
      .populate("userId", "fullName email")
      .sort({ createdAt: -1 });
    return { statusCode: Codes.SUCCESS, message: "All borrow records fetched", data: { history } };
  } catch (error) {
    return handleError(error, "Get All Borrow Module Error");
  }
};