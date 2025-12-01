export const validateBorrow = (data) => {
  const errors = {};

  if (!data.userId || data.userId.trim() === "") {
    errors.userId = "User ID is required";
  }

  if (!data.bookId || data.bookId.trim() === "") {
    errors.bookId = "Book ID is required";
  }

  if (!data.dueDate) {
    errors.dueDate = "Due date is required";
  } else if (isNaN(Date.parse(data.dueDate))) {
    errors.dueDate = "Invalid due date";
  } else {
    const due = new Date(data.dueDate);
    if (due <= new Date()) errors.dueDate = "Due date must be in future";
  }

  return errors;
};

export const validateReturn = (data) => {
  const errors = {};
  if (!data.userId || data.userId.trim() === "") errors.userId = "User ID is required";
  if (!data.bookId || data.bookId.trim() === "") errors.bookId = "Book ID is required";
  return errors;
};
