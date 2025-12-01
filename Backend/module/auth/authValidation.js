export const validateSignup = ({ fullName, email, phoneNumber, password }) => {
    const errors = {};
    const nameRegex = /^[A-Za-z ]{2,30}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!fullName) errors.fullName = "Full Name is required";
    else if (!nameRegex.test(fullName)) errors.fullName = "Only letters allowed (2–30 chars)";

    if (!email) errors.email = "Email is required";
    else if (!emailRegex.test(email)) errors.email = "Invalid email format";

    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    else if (!phoneRegex.test(phoneNumber))
        errors.phoneNumber = "Phone must be 10 digits starting with 6–9";

    if (!password) errors.password = "Password is required";
    else if (!passwordRegex.test(password))
        errors.password =
            "Password must contain uppercase, lowercase, number & special character";

    return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = {};
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!email) errors.email = "Email is required";
  else if (!emailRegex.test(email)) errors.email = "Invalid email format";

  if (!password) errors.password = "Password is required";
  else if (!passwordRegex.test(password))
    errors.password = "Password must be strong.";

  return errors;
};

