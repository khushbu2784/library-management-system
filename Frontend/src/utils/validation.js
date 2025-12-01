export const validateSignup = ({ firstName, lastName, email, password, phoneNumber }) => {
  const errors = {};
  const nameRegex = /^[A-Za-z]{2,15}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!firstName) errors.firstName = "First name is required";
  else if (!nameRegex.test(firstName)) errors.firstName = "Only letters (2–15 chars)";

  if (!lastName) errors.lastName = "Last name is required";
  else if (!nameRegex.test(lastName)) errors.lastName = "Only letters (2–15 chars)";

  if (!email) errors.email = "Email is required";
  else if (!emailRegex.test(email)) errors.email = "Invalid email format";

  if (!phoneNumber) errors.phoneNumber = "Phone number is required";
  else if (!phoneRegex.test(phoneNumber)) errors.phoneNumber = "Enter valid 10-digit mobile starting with 6–9";

  if (!password) errors.password = "Password is required";
  else if (!passwordRegex.test(password))
    errors.password = "Password must be 6+ chars, include uppercase, lowercase, number & special char";

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


export const validateOtp = (otp) => {
  const errors = {};
  if (!otp) errors.otp = "Enter OTP";
  else if (!/^\d{6}$/.test(otp)) errors.otp = "OTP must be 6 digits";
  return errors;
};

export const validateDoctorProfile = ({
  type,
  stateCouncil,
  city,
  experience,
  specialization,
  accessCode,
}) => {
  const errors = {};

  if (!type) errors.type = "Type is required";
  if (!stateCouncil) errors.stateCouncil = "State Medical Council is required";
  if (!city) errors.city = "City is required";
  if (!experience) errors.experience = "Experience is required";
  else if (experience <= 0) errors.experience = "Enter a valid experience";
  if (!specialization) errors.specialization = "Specialization is required";
  if (!accessCode) errors.accessCode = "Access code is required";

  return errors;
};
