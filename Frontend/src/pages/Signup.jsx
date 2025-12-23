// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { User, Mail, Lock, Phone } from "lucide-react";
// import Input from "../components/ui/Input";
// import Button from "../components/ui/Button";
// import Swal from "sweetalert2";
// import { authApi } from "../api/authApi";

// export default function Signup() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await authApi.signup(form);

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: res?.message,
//       });

//       navigate("/login");
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops!",
//         text: error?.message || "Something went wrong",
//       });
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
//         <h1 className="text-3xl font-bold text-center text-purple-600">
//           Create Account
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">

//           <Input
//             name="fullName"
//             placeholder="Full Name"
//             icon={User}
//             value={form.fullName}
//             onChange={handleChange}
//           />

//           <Input
//             name="email"
//             placeholder="Email Address"
//             icon={Mail}
//             value={form.email}
//             onChange={handleChange}
//           />

//           <Input
//             name="phoneNumber"
//             placeholder="Phone Number"
//             icon={Phone}
//             value={form.phoneNumber}
//             onChange={handleChange}
//           />

//           <Input
//             type="password"
//             name="password"
//             placeholder="Password"
//             icon={Lock}
//             value={form.password}
//             onChange={handleChange}
//           />

//           <Button type="submit" loading={loading}>
//             Sign Up
//           </Button>
//         </form>

//         <p className="text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-purple-600 font-semibold">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Swal from "sweetalert2";
import { authApi } from "../api/authApi";
import { validateSignup } from "../utils/validation";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // clear error while typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSignup(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await authApi.signup(form);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res?.message,
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error?.message || "Something went wrong",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-purple-600">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            name="fullName"
            placeholder="Full Name"
            icon={User}
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <Input
            name="email"
            placeholder="Email Address"
            icon={Mail}
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            icon={Phone}
            value={form.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            icon={Lock}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button type="submit" loading={loading}>
            Sign Up
          </Button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
