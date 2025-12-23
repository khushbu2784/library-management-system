import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, unique: true, sparse: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);


// {
//   "fullName": "Khushi",
//   "email": "khushiadmin1@gmail.com",
//   "password": "Admin@123",
//   "phoneNumber": "9999999999",
//   "role": "admin"
// }

//  "email": "khushiadmin1@gmail.com",
//   "password": "Admin@123"
