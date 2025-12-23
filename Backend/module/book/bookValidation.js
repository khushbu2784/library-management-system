export const validateCreateBook = (data) => {
  const errors = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (!data.author || data.author.trim() === "") {
    errors.author = "Author is required";
  }

  // publicationYear (number)
  if (data.publicationYear && isNaN(Number(data.publicationYear))) {
    errors.publicationYear = "Publication year must be a number";
  }

  // pages (number)
  if (data.pages && isNaN(Number(data.pages))) {
    errors.pages = "Pages must be a number";
  }

  // isAvailable (boolean)
  if (
    data.isAvailable !== undefined &&
    !["true", "false", true, false].includes(data.isAvailable)
  ) {
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

  if (data.publicationYear && isNaN(Number(data.publicationYear))) {
    errors.publicationYear = "Publication year must be a number";
  }

  if (data.pages && isNaN(Number(data.pages))) {
    errors.pages = "Pages must be a number";
  }

  if (
    data.isAvailable !== undefined &&
    !["true", "false", true, false].includes(data.isAvailable)
  ) {
    errors.isAvailable = "isAvailable must be true or false";
  }

  return errors;
};
