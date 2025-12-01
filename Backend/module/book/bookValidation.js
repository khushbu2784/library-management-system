export const validateCreateBook = (data) => {
  const errors = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (!data.author || data.author.trim() === "") {
    errors.author = "Author is required";
  }

  if (data.publishedDate && isNaN(Date.parse(data.publishedDate))) {
    errors.publishedDate = "Invalid published date";
  }

  if (data.pages && typeof data.pages !== "number") {
    errors.pages = "Pages must be a number";
  }

  if (data.isAvailable !== undefined && typeof data.isAvailable !== "boolean") {
    errors.isAvailable = "isAvailable must be true or false";
  }

  return errors;
};

export const validateUpdateBook = (data) => {
  const errors = {};

  if (data.title !== undefined && data.title.trim() === "") {
    errors.title = "Title cannot be empty";
  }

  if (data.author !== undefined && data.author.trim() === "") {
    errors.author = "Author cannot be empty";
  }

  if (data.publishedDate && isNaN(Date.parse(data.publishedDate))) {
    errors.publishedDate = "Invalid published date";
  }

  if (data.pages && typeof data.pages !== "number") {
    errors.pages = "Pages must be a number";
  }

  if (data.isAvailable !== undefined && typeof data.isAvailable !== "boolean") {
    errors.isAvailable = "isAvailable must be true or false";
  }

  return errors;
};
